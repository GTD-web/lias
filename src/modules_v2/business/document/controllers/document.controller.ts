import {
    Controller,
    Post,
    Put,
    Get,
    Delete,
    Body,
    Param,
    Query,
    HttpCode,
    HttpStatus,
    UseGuards,
    BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import {
    CreateDocumentRequestDto,
    UpdateDocumentRequestDto,
    SubmitDocumentRequestDto,
    DocumentResponseDto,
} from '../dtos';
import {
    CreateDocumentUsecase,
    UpdateDocumentUsecase,
    SubmitDocumentUsecase,
    CancelDocumentUsecase,
    GetDocumentUsecase,
} from '../usecases';
import { DocumentStatus } from '../../../../common/enums/approval.enum';
import { JwtAuthGuard } from '../../../../common/guards/jwt-auth.guard';
import { User } from '../../../../common/decorators/user.decorator';
import { Employee } from '../../../domain/employee/employee.entity';

@ApiTags('문서 관리')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class DocumentController {
    constructor(
        private readonly createDocumentUsecase: CreateDocumentUsecase,
        private readonly updateDocumentUsecase: UpdateDocumentUsecase,
        private readonly submitDocumentUsecase: SubmitDocumentUsecase,
        private readonly cancelDocumentUsecase: CancelDocumentUsecase,
        private readonly getDocumentUsecase: GetDocumentUsecase,
    ) {}

    @Post()
    @ApiOperation({
        summary: '문서 생성',
        description:
            '새로운 문서를 생성합니다 (임시저장 상태)\n\n' +
            '**양식 선택적 지원:**\n' +
            '- formVersionId를 입력하지 않으면 양식 없는 외부 문서로 생성됩니다\n' +
            '- 양식이 없어도 문서 생성 및 제출이 가능합니다\n\n' +
            '**CustomApprovalSteps 지원:**\n' +
            '- 문서 생성 시 결재선을 커스터마이징할 수 있습니다\n' +
            '- 다양한 assigneeRule 지원: FIXED, DRAFTER, DRAFTER_SUPERIOR, DEPARTMENT_HEAD, POSITION_BASED, DEPARTMENT_REFERENCE\n' +
            '- 임시저장 시에도 결재선 스냅샷이 생성됩니다\n' +
            '- DEPARTMENT_REFERENCE: 부서 전체 참조 (REFERENCE 타입에서만 사용, departmentId 필수)\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 양식이 있는 문서 생성 (임시저장)\n' +
            '- ✅ 정상: 양식이 없는 외부 문서 생성\n' +
            '- ✅ 정상: metadata 없이 문서 생성\n' +
            '- ✅ 정상: customApprovalSteps와 함께 문서 생성\n' +
            '- ✅ 정상: 다양한 assigneeRule로 결재선 커스터마이징\n' +
            '- ❌ 실패: 필수 필드 누락 (title, content)\n' +
            '- ❌ 실패: 존재하지 않는 formVersionId (404 반환)\n' +
            '- ❌ 실패: 잘못된 assigneeRule (400 반환)\n' +
            '- ❌ 실패: 인증 토큰 없음 (401 반환)',
    })
    @ApiResponse({ status: 201, description: '문서 생성 성공', type: DocumentResponseDto })
    @ApiResponse({ status: 400, description: '잘못된 요청' })
    @ApiResponse({ status: 401, description: '인증 실패' })
    @ApiResponse({ status: 404, description: '양식을 찾을 수 없음' })
    async createDocument(@User() user: Employee, @Body() dto: CreateDocumentRequestDto): Promise<DocumentResponseDto> {
        return await this.createDocumentUsecase.execute(user.id, dto);
    }

    @Put(':documentId')
    @ApiOperation({
        summary: '문서 수정',
        description:
            '임시저장 상태의 문서를 수정합니다\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: DRAFT 상태 문서 수정\n' +
            '- ✅ 정상: 일부 필드만 수정\n' +
            '- ❌ 실패: 존재하지 않는 문서 ID (404 반환)\n' +
            '- ❌ 실패: 제출된 문서(PENDING) 수정 시도 (400 반환)\n' +
            '- ❌ 실패: 다른 사용자의 문서 수정 시도 (403 반환)\n' +
            '- ❌ 실패: 인증 토큰 없음 (401 반환)',
    })
    @ApiParam({ name: 'documentId', description: '문서 ID' })
    @ApiResponse({ status: 200, description: '문서 수정 성공', type: DocumentResponseDto })
    @ApiResponse({ status: 400, description: '잘못된 요청' })
    @ApiResponse({ status: 404, description: '문서를 찾을 수 없음' })
    async updateDocument(
        @User() user: Employee,
        @Param('documentId') documentId: string,
        @Body() dto: UpdateDocumentRequestDto,
    ): Promise<DocumentResponseDto> {
        return await this.updateDocumentUsecase.execute(user.id, documentId, dto);
    }

    @Post(':documentId/submit')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '문서 제출',
        description:
            '문서를 결재선에 제출합니다\n\n' +
            '**결재선 자동 생성 정책:**\n' +
            '- ✅ 문서 양식에 결재선이 설정되어 있으면 해당 결재선 사용\n' +
            '- ✅ 문서 양식에 결재선이 없으면 자동으로 계층적 결재선 생성:\n' +
            '  - 기안자 → 기안자의 부서장 → 상위 부서장 → ... (최상위까지)\n' +
            '  - 기안자가 부서장인 경우 해당 단계는 건너뜀\n' +
            '  - drafterDepartmentId가 없으면 자동으로 기안자의 주 소속 부서 조회\n\n' +
            '**AssigneeRule 해석:**\n' +
            '- FIXED: 고정 결재자 (employeeId 사용)\n' +
            '- DRAFTER: 기안자 본인\n' +
            '- DRAFTER_SUPERIOR: 기안자의 상급자\n' +
            '- DEPARTMENT_REFERENCE: 지정된 부서의 모든 직원 (REFERENCE 타입에서만 사용)\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 문서 제출 (DRAFT → PENDING)\n' +
            '- ✅ 정상: 결재선이 없는 양식으로 제출 (자동 결재선 생성)\n' +
            '- ✅ 정상: customApprovalSteps와 함께 문서 제출\n' +
            '- ✅ 정상: 다양한 assigneeRule로 결재선 커스터마이징\n' +
            '- ❌ 실패: 이미 제출된 문서 재제출 시도 (400 반환)\n' +
            '- ❌ 실패: 존재하지 않는 문서 ID (404 반환)\n' +
            '- ❌ 실패: 결재선도 없고 부서 정보도 없음 (400 반환)\n' +
            '- ❌ 실패: 잘못된 assigneeRule (400 반환)\n' +
            '- ❌ 실패: 인증 토큰 없음 (401 반환)',
    })
    @ApiParam({ name: 'documentId', description: '문서 ID' })
    @ApiResponse({ status: 200, description: '문서 제출 성공', type: DocumentResponseDto })
    @ApiResponse({ status: 400, description: '잘못된 요청' })
    @ApiResponse({ status: 401, description: '인증 실패' })
    @ApiResponse({ status: 404, description: '문서를 찾을 수 없음' })
    async submitDocument(
        @User() user: Employee,
        @Param('documentId') documentId: string,
        @Body() dto: SubmitDocumentRequestDto,
    ): Promise<DocumentResponseDto> {
        return await this.submitDocumentUsecase.execute(user.id, documentId, dto);
    }

    @Get('my-documents')
    @ApiOperation({
        summary: '내 문서 조회',
        description:
            '내가 작성한 모든 문서를 조회합니다\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 내가 작성한 모든 문서 조회\n' +
            '- ✅ 정상: 작성자 확인 (drafterId 일치)\n' +
            '- ❌ 실패: 인증 토큰 없음 (401 반환)',
    })
    @ApiResponse({ status: 200, description: '문서 목록 조회 성공', type: [DocumentResponseDto] })
    @ApiResponse({ status: 401, description: '인증 실패' })
    async getMyDocuments(@User() user: Employee): Promise<DocumentResponseDto[]> {
        return await this.getDocumentUsecase.getByDrafter(user.id);
    }

    @Get('status/:status')
    @ApiOperation({
        summary: '상태별 문서 조회',
        description:
            '특정 상태의 모든 문서를 조회합니다\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: DRAFT 상태 문서 조회\n' +
            '- ✅ 정상: PENDING 상태 문서 조회\n' +
            '- ✅ 정상: APPROVED 상태 문서 조회 (빈 배열 가능)\n' +
            '- ❌ 실패: 잘못된 상태 값 (400 반환)\n' +
            '- ❌ 실패: 인증 토큰 없음 (401 반환)',
    })
    @ApiParam({ name: 'status', enum: DocumentStatus, description: '문서 상태' })
    @ApiResponse({ status: 200, description: '문서 목록 조회 성공', type: [DocumentResponseDto] })
    @ApiResponse({ status: 400, description: '잘못된 상태 값' })
    async getDocumentsByStatus(@Param('status') status: string): Promise<DocumentResponseDto[]> {
        // DocumentStatus enum 검증
        if (!Object.values(DocumentStatus).includes(status as DocumentStatus)) {
            throw new BadRequestException(`유효하지 않은 문서 상태입니다: ${status}`);
        }
        return await this.getDocumentUsecase.getByStatus(status as DocumentStatus);
    }

    @Get(':documentId')
    @ApiOperation({
        summary: '문서 조회',
        description:
            'ID로 문서를 조회합니다\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 특정 문서 조회\n' +
            '- ✅ 정상: 다른 사용자의 문서 조회 가능 (조회 권한)\n' +
            '- ❌ 실패: 존재하지 않는 문서 ID (404 반환)\n' +
            '- ❌ 실패: 인증 토큰 없음 (401 반환)',
    })
    @ApiParam({ name: 'documentId', description: '문서 ID' })
    @ApiResponse({ status: 200, description: '문서 조회 성공', type: DocumentResponseDto })
    @ApiResponse({ status: 404, description: '문서를 찾을 수 없음' })
    async getDocument(@Param('documentId') documentId: string): Promise<DocumentResponseDto> {
        return await this.getDocumentUsecase.getById(documentId);
    }

    @Delete(':documentId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '문서 삭제',
        description:
            '임시저장 상태의 문서를 삭제합니다\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: DRAFT 상태 문서 삭제\n' +
            '- ❌ 실패: 제출된 문서(PENDING) 삭제 시도 (400 반환)\n' +
            '- ❌ 실패: 존재하지 않는 문서 ID (404 반환)\n' +
            '- ❌ 실패: 이미 삭제된 문서 재삭제 시도 (404 반환)\n' +
            '- ❌ 실패: 다른 사용자의 문서 삭제 시도 (403 반환)\n' +
            '- ❌ 실패: 인증 토큰 없음 (401 반환)',
    })
    @ApiParam({ name: 'documentId', description: '문서 ID' })
    @ApiResponse({ status: 200, description: '문서 삭제 성공' })
    @ApiResponse({ status: 400, description: '잘못된 요청' })
    @ApiResponse({ status: 404, description: '문서를 찾을 수 없음' })
    async deleteDocument(@User() user: Employee, @Param('documentId') documentId: string) {
        return await this.cancelDocumentUsecase.execute(user.id, documentId);
    }
}
