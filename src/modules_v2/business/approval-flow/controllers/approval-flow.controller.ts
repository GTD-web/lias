import {
    Controller,
    Post,
    Patch,
    Get,
    Body,
    HttpCode,
    HttpStatus,
    Param,
    Query,
    UseGuards,
    BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import {
    CreateFormWithApprovalLineUsecase,
    UpdateFormVersionUsecase,
    CloneApprovalLineTemplateUsecase,
    CreateApprovalLineTemplateVersionUsecase,
    CreateApprovalLineTemplateUsecase,
    CreateApprovalSnapshotUsecase,
    PreviewApprovalLineUsecase,
} from '../usecases';
import {
    CreateFormRequestDto,
    UpdateFormVersionRequestDto,
    CloneTemplateRequestDto,
    CreateTemplateVersionRequestDto,
    CreateApprovalLineTemplateRequestDto,
    CreateSnapshotRequestDto,
    CreateFormResponseDto,
    UpdateFormVersionResponseDto,
    ApprovalLineTemplateResponseDto,
    ApprovalLineTemplateVersionResponseDto,
    ApprovalSnapshotResponseDto,
    FormResponseDto,
    PreviewApprovalLineRequestDto,
    PreviewApprovalLineResponseDto,
} from '../dtos';
import { JwtAuthGuard } from '../../../../common/guards/jwt-auth.guard';
import { User } from '../../../../common/decorators/user.decorator';
import { Employee } from '../../../domain/employee/employee.entity';
import { ApprovalFlowContext } from '../../../context/approval-flow/approval-flow.context';

/**
 * ApprovalFlowController
 *
 * 결재 흐름 관련 API 엔드포인트
 * - 문서양식 & 결재선 생성/수정
 * - 결재선 템플릿 복제 및 버전 관리
 * - 기안 시 결재 스냅샷 생성
 *
 * **테스트 범위:**
 * 1. 문서양식 생성 & 결재선 연결
 * 2. 문서양식 수정 (새 버전 생성)
 * 3. 결재선 템플릿 생성/복제/버전 관리
 * 4. 결재 스냅샷 생성
 * 5. 결재선 미리보기
 * 6. 조회 API들
 */
@ApiTags('Approval Flow (v2)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class ApprovalFlowController {
    constructor(
        private readonly createFormWithApprovalLineUsecase: CreateFormWithApprovalLineUsecase,
        private readonly updateFormVersionUsecase: UpdateFormVersionUsecase,
        private readonly cloneApprovalLineTemplateUsecase: CloneApprovalLineTemplateUsecase,
        private readonly createApprovalLineTemplateVersionUsecase: CreateApprovalLineTemplateVersionUsecase,
        private readonly createApprovalLineTemplateUsecase: CreateApprovalLineTemplateUsecase,
        private readonly createApprovalSnapshotUsecase: CreateApprovalSnapshotUsecase,
        private readonly previewApprovalLineUsecase: PreviewApprovalLineUsecase,
        private readonly approvalFlowContext: ApprovalFlowContext,
    ) {}

    @Post('forms')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: '문서양식 생성 & 결재선 연결',
        description:
            '새로운 문서양식을 생성하고 결재선을 연결합니다. ' +
            '기존 결재선을 참조하거나(useExistingLine=true) 복제 후 수정(useExistingLine=false)할 수 있습니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 복제 후 수정 방식으로 문서양식 생성\n' +
            '- ✅ 기존 결재선 참조하여 문서양식 생성\n' +
            '- ❌ 필수 필드 누락 (formName, formCode)\n' +
            '- ❌ useExistingLine=true인데 lineTemplateVersionId 누락\n' +
            '- ❌ useExistingLine=false인데 baseLineTemplateVersionId 누락\n' +
            '- ❌ 존재하지 않는 결재선 템플릿 버전 ID (404 반환)',
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: '문서양식 생성 성공',
        type: CreateFormResponseDto,
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: '잘못된 요청 (필수 파라미터 누락 등)',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: '인증 실패',
    })
    async createFormWithApprovalLine(
        @User() user: Employee,
        @Body() dto: CreateFormRequestDto,
    ): Promise<CreateFormResponseDto> {
        return this.createFormWithApprovalLineUsecase.execute(user.id, dto);
    }

    @Patch('forms/:formId/versions')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '문서양식 수정 (새 버전 생성)',
        description:
            '문서양식을 수정합니다. 기존 버전은 불변으로 유지하고 새 버전을 생성합니다. ' +
            '결재선도 변경 가능하며, 복제 후 수정도 지원합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 문서양식 템플릿 수정 (새 버전 생성)\n' +
            '- ✅ 결재선도 함께 변경\n' +
            '- ❌ 존재하지 않는 문서양식 ID (404 반환)',
    })
    @ApiParam({ name: 'formId', description: '문서양식 ID', example: 'form-123' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: '문서양식 수정 성공',
        type: UpdateFormVersionResponseDto,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: '문서양식을 찾을 수 없음',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: '인증 실패',
    })
    async updateFormVersion(
        @User() user: Employee,
        @Param('formId') formId: string,
        @Body() dto: UpdateFormVersionRequestDto,
    ): Promise<UpdateFormVersionResponseDto> {
        // body의 formId가 있는 경우, URL 파라미터와 일치하는지 검증
        if (dto.formId && dto.formId !== formId) {
            throw new BadRequestException('URL의 formId와 body의 formId가 일치하지 않습니다');
        }

        return this.updateFormVersionUsecase.execute(user.id, { ...dto, formId });
    }

    @Post('templates')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: '새로운 결재선 템플릿 생성',
        description:
            '완전히 새로운 결재선 템플릿을 생성합니다. ' +
            '템플릿 생성 시 첫 번째 버전(v1)이 자동으로 생성됩니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 새로운 결재선 템플릿 생성\n' +
            '- ❌ 필수 필드 누락 (name, steps)\n' +
            '- ❌ steps가 빈 배열 (400 반환)\n' +
            '- ❌ step에 필수 필드 누락 (assigneeRule)',
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: '결재선 템플릿 생성 성공',
        type: ApprovalLineTemplateResponseDto,
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: '잘못된 요청 (필수 파라미터 누락 등)',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: '인증 실패',
    })
    async createApprovalLineTemplate(
        @User() user: Employee,
        @Body() dto: CreateApprovalLineTemplateRequestDto,
    ): Promise<ApprovalLineTemplateResponseDto> {
        return this.createApprovalLineTemplateUsecase.execute(user.id, dto);
    }

    @Post('templates/clone')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: '결재선 템플릿 복제 (Detach & Clone)',
        description:
            '기존 결재선 템플릿을 복제합니다. ' +
            'newTemplateName이 있으면 새 템플릿을 생성(분기)하고, 없으면 원본 템플릿에 새 버전을 추가합니다. ' +
            '복제 시 단계를 수정할 수 있습니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 같은 템플릿의 새 버전으로 복제\n' +
            '- ✅ 새로운 템플릿으로 분기\n' +
            '- ❌ 필수 필드 누락 (baseTemplateVersionId)\n' +
            '- ❌ 존재하지 않는 소스 템플릿 버전 ID (404 반환)',
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: '결재선 템플릿 복제 성공',
        type: ApprovalLineTemplateVersionResponseDto,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: '원본 결재선 템플릿을 찾을 수 없음',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: '인증 실패',
    })
    async cloneApprovalLineTemplate(
        @User() user: Employee,
        @Body() dto: CloneTemplateRequestDto,
    ): Promise<ApprovalLineTemplateVersionResponseDto> {
        return this.cloneApprovalLineTemplateUsecase.execute(user.id, dto);
    }

    @Post('templates/:templateId/versions')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: '결재선 템플릿 새 버전 생성',
        description:
            '기존 결재선 템플릿의 새 버전을 생성합니다. 기존 버전은 비활성화되고 새 버전이 활성화됩니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 결재선 템플릿의 새 버전 생성\n' +
            '- ❌ 존재하지 않는 템플릿 ID (404 반환)\n' +
            '- ❌ 필수 필드 누락 (steps)',
    })
    @ApiParam({ name: 'templateId', description: '결재선 템플릿 ID', example: 'template-123' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: '새 버전 생성 성공',
        type: ApprovalLineTemplateVersionResponseDto,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: '결재선 템플릿을 찾을 수 없음',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: '인증 실패',
    })
    async createApprovalLineTemplateVersion(
        @User() user: Employee,
        @Param('templateId') templateId: string,
        @Body() dto: CreateTemplateVersionRequestDto,
    ): Promise<ApprovalLineTemplateVersionResponseDto> {
        // body의 templateId가 있는 경우, URL 파라미터와 일치하는지 검증
        if (dto.templateId && dto.templateId !== templateId) {
            throw new BadRequestException('URL의 templateId와 body의 templateId가 일치하지 않습니다');
        }

        return this.createApprovalLineTemplateVersionUsecase.execute(user.id, { ...dto, templateId });
    }

    @Post('snapshots')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: '결재 스냅샷 생성 (기안 시 호출)',
        description:
            '문서 기안 시 호출됩니다. ' +
            '결재선 템플릿의 assignee_rule을 기안 컨텍스트로 해석하여 실제 결재자를 확정하고 스냅샷으로 저장합니다. ' +
            '이후 결재선 템플릿이 변경되어도 기안된 문서의 결재선은 변경되지 않습니다.\n\n' +
            '**AssigneeRule 해석 규칙:**\n' +
            '- FIXED: 고정 결재자 (defaultApproverId 사용)\n' +
            '- DRAFTER: 기안자 본인\n' +
            '- DRAFTER_SUPERIOR: 기안자의 상급자\n' +
            '- DEPARTMENT_HEAD: 지정된 부서의 부서장\n' +
            '- POSITION_BASED: 지정된 직책의 담당자\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 다양한 assigneeRule로 스냅샷 생성\n' +
            '- ❌ 실패: 존재하지 않는 formVersionId (404 반환)\n' +
            '- ❌ 실패: assigneeRule 해석 실패 (400 반환)\n' +
            '- ❌ 실패: 필수 필드 누락 (formVersionId, drafterId)\n\n' +
            '**참고:** 이 API는 주로 문서 제출(POST /v2/documents/:documentId/submit) 프로세스 내에서 내부적으로 호출됩니다.',
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: '결재 스냅샷 생성 성공',
        type: ApprovalSnapshotResponseDto,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: '문서양식 버전을 찾을 수 없음',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: '결재자를 찾을 수 없음 (assignee_rule 해석 실패)',
    })
    async createApprovalSnapshot(@Body() dto: CreateSnapshotRequestDto): Promise<ApprovalSnapshotResponseDto> {
        return this.createApprovalSnapshotUsecase.execute(dto);
    }

    // ===== 조회 API =====

    @Get('templates')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '결재선 템플릿 목록 조회',
        description:
            '등록된 결재선 템플릿 목록을 조회합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 모든 결재선 템플릿 조회\n' +
            '- ✅ 타입별 필터링',
    })
    @ApiQuery({ name: 'type', required: false, description: '템플릿 유형 (COMMON, DEDICATED 등)' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: '결재선 템플릿 목록 조회 성공',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: '인증 실패',
    })
    async getApprovalLineTemplates(@Query('type') type?: string) {
        return await this.approvalFlowContext.getApprovalLineTemplates(type);
    }

    @Get('templates/:templateId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '결재선 템플릿 상세 조회',
        description:
            '특정 결재선 템플릿의 상세 정보를 조회합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 특정 결재선 템플릿 조회\n' +
            '- ❌ 존재하지 않는 템플릿 ID (404 반환)',
    })
    @ApiParam({ name: 'templateId', description: '결재선 템플릿 ID' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: '결재선 템플릿 조회 성공',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: '결재선 템플릿을 찾을 수 없음',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: '인증 실패',
    })
    async getApprovalLineTemplate(@Param('templateId') templateId: string) {
        return await this.approvalFlowContext.getApprovalLineTemplateById(templateId);
    }

    @Get('templates/:templateId/versions/:versionId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '결재선 템플릿 버전 상세 조회',
        description: '특정 결재선 템플릿의 특정 버전 상세 정보를 조회합니다.',
    })
    @ApiParam({ name: 'templateId', description: '결재선 템플릿 ID' })
    @ApiParam({ name: 'versionId', description: '결재선 템플릿 버전 ID' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: '결재선 템플릿 버전 상세 조회 성공',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: '결재선 템플릿 버전을 찾을 수 없음',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: '인증 실패',
    })
    async getApprovalLineTemplateVersion(
        @Param('templateId') templateId: string,
        @Param('versionId') versionId: string,
    ) {
        return await this.approvalFlowContext.getApprovalLineTemplateVersion(templateId, versionId);
    }

    @Get('forms')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '문서양식 목록 조회',
        description: '등록된 문서양식 목록을 조회합니다.\n\n' + '**테스트 시나리오:**\n' + '- ✅ 모든 문서양식 조회',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: '문서양식 목록 조회 성공',
        type: [FormResponseDto],
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: '인증 실패',
    })
    async getForms() {
        return await this.approvalFlowContext.getForms();
    }

    @Get('forms/:formId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '문서양식 상세 조회',
        description:
            '특정 문서양식의 상세 정보를 조회합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 특정 문서양식 조회\n' +
            '- ❌ 존재하지 않는 문서양식 ID (404 반환)',
    })
    @ApiParam({ name: 'formId', description: '문서양식 ID' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: '문서양식 조회 성공',
        type: FormResponseDto,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: '문서양식을 찾을 수 없음',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: '인증 실패',
    })
    async getForm(@Param('formId') formId: string) {
        return await this.approvalFlowContext.getFormById(formId);
    }

    @Get('forms/:formId/versions/:versionId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '문서양식 버전 상세 조회',
        description: '특정 문서양식의 특정 버전 상세 정보를 조회합니다.',
    })
    @ApiParam({ name: 'formId', description: '문서양식 ID' })
    @ApiParam({ name: 'versionId', description: '문서양식 버전 ID' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: '문서양식 버전 상세 조회 성공',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: '문서양식 버전을 찾을 수 없음',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: '인증 실패',
    })
    async getFormVersion(@Param('formId') formId: string, @Param('versionId') versionId: string) {
        return await this.approvalFlowContext.getFormVersion(formId, versionId);
    }

    @Post('forms/:formId/preview-approval-line')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: '결재선 미리보기',
        description:
            '문서 작성 시 실제로 할당될 결재자 목록을 미리 확인합니다. ' +
            '문서양식에 연결된 결재선 템플릿과 기안 컨텍스트를 기반으로 ' +
            '실제 결재자(이름, 부서, 직책)를 조회합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 결재선 미리보기 조회\n' +
            '- ❌ 필수 필드 누락 (formVersionId)\n' +
            '- ❌ 존재하지 않는 문서양식 ID (404 반환)',
    })
    @ApiParam({ name: 'formId', description: '문서양식 ID' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: '결재선 미리보기 성공',
        type: PreviewApprovalLineResponseDto,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: '문서양식 또는 결재선 템플릿을 찾을 수 없음',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: '잘못된 요청 (기안자 부서 정보 없음 등)',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: '인증 실패',
    })
    async previewApprovalLine(
        @User() employee: Employee,
        @Param('formId') formId: string,
        @Body() dto: PreviewApprovalLineRequestDto,
    ): Promise<PreviewApprovalLineResponseDto> {
        return await this.previewApprovalLineUsecase.execute(employee.id, formId, dto);
    }
}
