import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    UseGuards,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../common/guards/jwt-auth.guard';
import { DocumentService } from '../services/document.service';
import {
    CreateDocumentDto,
    UpdateDocumentDto,
    SubmitDocumentDto,
    SubmitDocumentBodyDto,
    SubmitDocumentDirectDto,
    DocumentResponseDto,
    SubmitDocumentResponseDto,
    ApprovalStepSnapshotResponseDto,
    QueryDocumentsDto,
    PaginatedDocumentsResponseDto,
    DocumentTemplateWithApproversResponseDto,
    DocumentStatisticsResponseDto,
    QueryMyAllDocumentsDto,
    MyAllDocumentsStatisticsResponseDto,
} from '../dtos';
import { DocumentStatus } from '../../../../common/enums/approval.enum';

/**
 * 문서 관리 컨트롤러
 * 문서 CRUD 및 기안 관련 API를 제공합니다.
 */
@ApiTags('문서 관리')
// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller('documents')
export class DocumentController {
    constructor(private readonly documentService: DocumentService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: '문서 생성 (임시저장)',
        description:
            '문서를 임시저장 상태로 생성합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 문서 생성\n' +
            '- ❌ 실패: 필수 필드 누락 (drafterId)\n' +
            '- ❌ 실패: 존재하지 않는 documentTemplateId',
    })
    @ApiResponse({
        status: 201,
        description: '문서 생성 성공',
        type: DocumentResponseDto,
    })
    @ApiResponse({
        status: 400,
        description: '잘못된 요청',
    })
    @ApiResponse({
        status: 401,
        description: '인증 실패',
    })
    async createDocument(@Body() dto: CreateDocumentDto) {
        return await this.documentService.createDocument(dto);
    }

    /** Deprecated: 더 이상 사용되지 않음, 대신 getMyAllDocuments 사용 */
    // @Get()
    // @ApiOperation({
    //     summary: '문서 목록 조회 (페이징, 필터링)',
    //     description:
    //         '문서 목록을 조회합니다. 상태, 기안자, 카테고리, 검색어 등으로 필터링 가능하며 페이징을 지원합니다.\n\n' +
    //         '**=== 필터링 조건 가이드 ===**\n\n' +
    //         '**▣ 내가 기안한 문서 조회 (drafterId 지정)**\n' +
    //         '1. **임시저장**: `status=DRAFT`, `pendingStepType 미지정`\n' +
    //         '2. **전체 상신**: `status 미지정`, `pendingStepType 미지정`\n' +
    //         '3. **협의 대기**: `status=PENDING`, `pendingStepType=AGREEMENT`\n' +
    //         '4. **미결 대기**: `status=PENDING`, `pendingStepType=APPROVAL`\n' +
    //         '5. **기결**: `status=APPROVED`, `pendingStepType 미지정`\n' +
    //         '6. **반려**: `status=REJECTED`, `pendingStepType 미지정`\n' +
    //         '7. **시행**: `status=IMPLEMENTED`, `pendingStepType 미지정`\n\n' +
    //         '**▣ 내가 참조자로 있는 문서 조회 (referenceUserId 지정)**\n' +
    //         '8. **참조**: `referenceUserId만 지정`, `status 미지정`, `pendingStepType 미지정` (DRAFT 제외)\n\n' +
    //         '**⚠️ 주의사항:**\n' +
    //         '- drafterId와 referenceUserId는 상호 배타적 (referenceUserId 우선)\n' +
    //         '- PENDING 상태는 현재 진행 중인 단계(가장 작은 stepOrder)를 기준으로 분류\n' +
    //         '- 참조 문서는 임시저장(DRAFT) 상태 제외\n\n' +
    //         '**주요 기능:**\n' +
    //         '- 상태별 필터링 (PENDING 상태는 pendingStepType으로 세분화 가능)\n' +
    //         '- 카테고리별 필터링\n' +
    //         '- 제목 검색\n' +
    //         '- 페이징 처리 (기본 20개)\n\n' +
    //         '**테스트 시나리오:**\n' +
    //         '- ✅ 정상: 전체 문서 목록 조회\n' +
    //         '- ✅ 정상: 상태별 필터링 조회\n' +
    //         '- ✅ 정상: PENDING + 협의 단계 필터링\n' +
    //         '- ✅ 정상: PENDING + 결재 단계 필터링\n' +
    //         '- ✅ 정상: 카테고리별 필터링\n' +
    //         '- ✅ 정상: 제목 검색\n' +
    //         '- ✅ 정상: 페이징 처리',
    // })
    // @ApiResponse({
    //     status: 200,
    //     description: '문서 목록 조회 성공',
    //     type: PaginatedDocumentsResponseDto,
    // })
    // @ApiResponse({
    //     status: 401,
    //     description: '인증 실패',
    // })
    // async getDocuments(@Query() query: QueryDocumentsDto) {
    //     return await this.documentService.getDocuments({
    //         status: query.status,
    //         pendingStepType: query.pendingStepType,
    //         drafterId: query.drafterId,
    //         referenceUserId: query.referenceUserId,
    //         categoryId: query.categoryId,
    //         searchKeyword: query.searchKeyword,
    //         startDate: query.startDate ? new Date(query.startDate) : undefined,
    //         endDate: query.endDate ? new Date(query.endDate) : undefined,
    //         page: query.page,
    //         limit: query.limit,
    //     });
    // }

    @Get('my-all/statistics')
    @ApiOperation({
        summary: '내 전체 문서 통계 조회 (사이드바용)',
        description:
            '사이드바 표시를 위한 통계를 조회합니다.\n\n' +
            '**응답 형식:**\n' +
            '```json\n' +
            '{\n' +
            '  "DRAFT": 1,                  // 임시저장 (내가 기안한 문서, DRAFT 상태)\n' +
            '  "PENDING": 10,               // 상신함 (내가 기안한 제출된 전체 문서)\n' +
            '  "PENDING_AGREEMENT": 1,      // 합의함 (내가 협의자로 결재라인에 있는 문서, PENDING 상태)\n' +
            '  "PENDING_APPROVAL": 2,       // 결재함 (내가 결재자로 결재라인에 있는 문서, PENDING 상태)\n' +
            '  "IMPLEMENTATION": 1,         // 시행함 (내가 시행자로 결재라인에 있는 문서, APPROVED 상태)\n' +
            '  "APPROVED": 20,              // 기결함 (내가 기안한 문서, IMPLEMENTED 상태 - 시행까지 완료)\n' +
            '  "REJECTED": 3,               // 반려함 (내가 기안한 문서, REJECTED 상태)\n' +
            '  "RECEIVED_REFERENCE": 23     // 수신참조함 (내가 참조자로 있는 문서)\n' +
            '}\n' +
            '```\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 문서 통계 조회\n' +
            '- ❌ 실패: 존재하지 않는 사용자 ID',
    })
    @ApiQuery({
        name: 'userId',
        required: true,
        description: '사용자 ID',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @ApiResponse({
        status: 200,
        description: '내 전체 문서 통계 조회 성공',
        type: MyAllDocumentsStatisticsResponseDto,
    })
    @ApiResponse({
        status: 401,
        description: '인증 실패',
    })
    async getMyAllDocumentsStatistics(@Query('userId') userId: string) {
        return await this.documentService.getMyAllDocumentsStatistics(userId);
    }

    @Get('my-all')
    @ApiOperation({
        summary: '내 전체 문서 목록 조회 (통계와 동일한 필터)',
        description:
            '통계 조회와 동일한 필터로 실제 문서 목록을 조회합니다.\n\n' +
            '**필터 타입 (filterType):**\n' +
            '- DRAFT: 임시저장 (내가 기안한 문서, DRAFT 상태)\n' +
            '- PENDING: 상신함 (내가 기안한 제출된 전체 문서)\n' +
            '- PENDING_AGREEMENT: 합의함 (내가 협의자로 결재라인에 있는 문서, PENDING 상태)\n' +
            '- PENDING_APPROVAL: 결재함 (내가 결재자로 결재라인에 있는 문서, PENDING 상태)\n' +
            '- IMPLEMENTATION: 시행함 (내가 시행자로 결재라인에 있는 문서, APPROVED 상태 - 결재 완료, 시행 대기)\n' +
            '- APPROVED: 기결함 (내가 기안한 문서, IMPLEMENTED 상태 - 시행까지 완료)\n' +
            '- REJECTED: 반려함 (내가 기안한 문서, REJECTED 상태)\n' +
            '- RECEIVED_REFERENCE: 수신참조함 (내가 참조자로 있는 문서)\n' +
            '- 미지정: 내가 기안한 문서 + 내가 참여하는 문서 전체\n\n' +
            '**승인 상태 필터 (approvalStatus) - PENDING_AGREEMENT, PENDING_APPROVAL에만 적용:**\n' +
            '- SCHEDULED: 승인 예정 (아직 내 차례가 아님, 내 앞에 PENDING 단계가 있음)\n' +
            '- CURRENT: 승인할 차례 (현재 내 차례, 내가 현재 가장 작은 stepOrder의 PENDING)\n' +
            '- COMPLETED: 승인 완료 (내가 이미 승인함, 내 단계가 APPROVED)\n' +
            '- 미지정: 모든 승인 상태 포함\n\n' +
            '**추가 필터링:**\n' +
            '- searchKeyword: 제목 검색\n' +
            '- categoryId: 카테고리 구분\n' +
            '- startDate, endDate: 제출일 구분\n' +
            '- page, limit: 페이징\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 전체 문서 목록 조회 (filterType 없음)\n' +
            '- ✅ 정상: DRAFT 필터링\n' +
            '- ✅ 정상: PENDING_APPROVAL + CURRENT 필터링\n' +
            '- ✅ 정상: PENDING_AGREEMENT + SCHEDULED 필터링\n' +
            '- ✅ 정상: IMPLEMENTATION 필터링\n' +
            '- ✅ 정상: RECEIVED_REFERENCE 필터링\n' +
            '- ✅ 정상: 제목 검색\n' +
            '- ✅ 정상: 카테고리별 필터링\n' +
            '- ✅ 정상: 제출일 범위 필터링',
    })
    @ApiResponse({
        status: 200,
        description: '내 전체 문서 목록 조회 성공',
        type: PaginatedDocumentsResponseDto,
    })
    @ApiResponse({
        status: 401,
        description: '인증 실패',
    })
    async getMyAllDocuments(@Query() query: QueryMyAllDocumentsDto) {
        return await this.documentService.getMyAllDocuments({
            userId: query.userId!,
            filterType: query.filterType,
            approvalStatus: query.approvalStatus,
            referenceReadStatus: query.referenceReadStatus,
            searchKeyword: query.searchKeyword,
            categoryId: query.categoryId,
            startDate: query.startDate ? new Date(query.startDate) : undefined,
            endDate: query.endDate ? new Date(query.endDate) : undefined,
            page: query.page,
            limit: query.limit,
        });
    }

    @Get('my-drafts/:drafterId')
    @ApiOperation({
        summary: '내가 작성한 문서 전체 조회 (상태 무관)',
        description:
            '내가 작성한 모든 문서를 상태에 상관없이 조회합니다.\n\n' +
            '**주요 기능:**\n' +
            '- 내가 기안한 모든 문서 조회 (DRAFT, PENDING, APPROVED, REJECTED, IMPLEMENTED 모두 포함)\n' +
            '- 페이징 지원\n' +
            '- 생성일 기준 내림차순 정렬\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 내가 작성한 문서 전체 조회\n' +
            '- ✅ 정상: 페이징 처리\n' +
            '- ❌ 실패: 존재하지 않는 사용자 ID',
    })
    @ApiParam({
        name: 'userId',
        description: '사용자 ID',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @ApiQuery({
        name: 'page',
        required: false,
        description: '페이지 번호 (1부터 시작)',
        example: 1,
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        description: '페이지당 항목 수',
        example: 20,
    })
    @ApiResponse({
        status: 200,
        description: '내가 작성한 문서 전체 조회 성공',
        type: PaginatedDocumentsResponseDto,
    })
    @ApiResponse({
        status: 401,
        description: '인증 실패',
    })
    async getMyDrafts(
        @Param('drafterId') drafterId: string,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ) {
        return await this.documentService.getMyDrafts(drafterId, page || 1, limit || 20);
    }

    @Get(':documentId')
    @ApiOperation({
        summary: '문서 상세 조회',
        description:
            '특정 문서의 상세 정보를 조회합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 문서 상세 조회\n' +
            '- ❌ 실패: 존재하지 않는 문서 ID',
    })
    @ApiParam({
        name: 'documentId',
        description: '문서 ID',
    })
    @ApiResponse({
        status: 200,
        description: '문서 상세 조회 성공',
        type: DocumentResponseDto,
    })
    @ApiResponse({
        status: 404,
        description: '문서를 찾을 수 없음',
    })
    @ApiResponse({
        status: 401,
        description: '인증 실패',
    })
    async getDocument(@Param('documentId') documentId: string) {
        return await this.documentService.getDocument(documentId);
    }

    @Put(':documentId')
    @ApiOperation({
        summary: '문서 수정',
        description:
            '임시저장 상태의 문서를 수정합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 문서 수정\n' +
            '- ❌ 실패: 존재하지 않는 문서 ID',
    })
    @ApiParam({
        name: 'documentId',
        description: '문서 ID',
    })
    @ApiResponse({
        status: 200,
        description: '문서 수정 성공',
        type: DocumentResponseDto,
    })
    @ApiResponse({
        status: 404,
        description: '문서를 찾을 수 없음',
    })
    @ApiResponse({
        status: 400,
        description: '잘못된 요청 (임시저장 상태가 아님)',
    })
    @ApiResponse({
        status: 401,
        description: '인증 실패',
    })
    async updateDocument(@Param('documentId') documentId: string, @Body() dto: UpdateDocumentDto) {
        return await this.documentService.updateDocument(documentId, dto);
    }

    @Delete(':documentId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: '문서 삭제',
        description:
            '임시저장 상태의 문서를 삭제합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 문서 삭제\n' +
            '- ❌ 실패: 존재하지 않는 문서 삭제\n' +
            '- ❌ 실패: 이미 제출된 문서 삭제',
    })
    @ApiParam({
        name: 'documentId',
        description: '문서 ID',
    })
    @ApiResponse({
        status: 204,
        description: '문서 삭제 성공',
    })
    @ApiResponse({
        status: 404,
        description: '문서를 찾을 수 없음',
    })
    @ApiResponse({
        status: 400,
        description: '잘못된 요청 (임시저장 상태가 아님)',
    })
    @ApiResponse({
        status: 401,
        description: '인증 실패',
    })
    async deleteDocument(@Param('documentId') documentId: string) {
        await this.documentService.deleteDocument(documentId);
    }

    @Post(':documentId/submit')
    @ApiOperation({
        summary: '문서 기안',
        description:
            '임시저장된 문서를 기안합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 문서 기안\n' +
            '- ❌ 실패: 이미 제출된 문서 재제출',
    })
    @ApiParam({
        name: 'documentId',
        description: '기안할 문서 ID',
    })
    @ApiResponse({
        status: 200,
        description: '문서 기안 성공',
        type: SubmitDocumentResponseDto,
    })
    @ApiResponse({
        status: 404,
        description: '문서를 찾을 수 없음',
    })
    @ApiResponse({
        status: 400,
        description: '잘못된 요청 (임시저장 상태가 아님)',
    })
    @ApiResponse({
        status: 401,
        description: '인증 실패',
    })
    async submitDocument(@Param('documentId') documentId: string, @Body() dto: SubmitDocumentBodyDto) {
        return await this.documentService.submitDocument({
            documentId,
            ...dto,
        });
    }

    @Post('submit-direct')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: '바로 기안',
        description:
            '임시저장 단계를 건너뛰고 바로 기안합니다. 내부적으로 임시저장 후 기안하는 방식으로 처리됩니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 바로 기안\n' +
            '- ❌ 실패: 필수 필드 누락',
    })
    @ApiResponse({
        status: 201,
        description: '문서 기안 성공',
        type: SubmitDocumentResponseDto,
    })
    @ApiResponse({
        status: 400,
        description: '잘못된 요청',
    })
    @ApiResponse({
        status: 401,
        description: '인증 실패',
    })
    async submitDocumentDirect(@Body() dto: SubmitDocumentDirectDto) {
        return await this.documentService.submitDocumentDirect(dto);
    }

    @Get('templates/:templateId')
    @ApiOperation({
        summary: '새 문서 작성용 템플릿 상세 조회',
        description:
            '새 문서 작성 시 사용할 템플릿의 상세 정보를 조회합니다. AssigneeRule을 기반으로 실제 적용될 결재자 정보가 맵핑되어 반환됩니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 템플릿 상세 조회\n' +
            '- ✅ 정상 또는 실패: drafterId 없이 조회\n' +
            '- ❌ 실패: 존재하지 않는 템플릿 ID',
    })
    @ApiParam({
        name: 'templateId',
        description: '문서 템플릿 ID',
    })
    @ApiQuery({
        name: 'drafterId',
        required: true,
        description: '기안자 ID (결재자 정보 맵핑을 위해 필요)',
    })
    @ApiResponse({
        status: 200,
        description: '템플릿 상세 조회 성공 (결재자 정보 맵핑 포함)',
        type: DocumentTemplateWithApproversResponseDto,
    })
    @ApiResponse({
        status: 404,
        description: '템플릿 또는 기안자를 찾을 수 없음',
    })
    @ApiResponse({
        status: 400,
        description: '잘못된 요청 (기안자의 부서/직책 정보 없음)',
    })
    @ApiResponse({
        status: 401,
        description: '인증 실패',
    })
    async getTemplateForNewDocument(@Param('templateId') templateId: string, @Query('drafterId') drafterId: string) {
        return await this.documentService.getTemplateForNewDocument(templateId, drafterId);
    }

    @Get('statistics/:userId')
    @ApiOperation({
        summary: '문서 통계 조회',
        description:
            '사용자의 문서 통계를 조회합니다.\n\n' +
            '**내가 기안한 문서 통계:**\n' +
            '- 상신: 제출된 전체 문서\n' +
            '- 협의: PENDING 상태 + 현재 AGREEMENT 단계\n' +
            '- 미결: PENDING 상태 + 현재 APPROVAL 단계\n' +
            '- 기결: APPROVED 상태\n' +
            '- 반려: REJECTED 상태\n' +
            '- 시행: IMPLEMENTED 상태\n' +
            '- 임시저장: DRAFT 상태\n\n' +
            '**다른 사람이 기안한 문서:**\n' +
            '- 참조: 내가 참조자(REFERENCE)로 있는 문서\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 문서 통계 조회\n' +
            '- ❌ 실패: 존재하지 않는 사용자 ID',
    })
    @ApiParam({
        name: 'userId',
        description: '사용자 ID',
    })
    @ApiResponse({
        status: 200,
        description: '문서 통계 조회 성공',
        type: DocumentStatisticsResponseDto,
    })
    @ApiResponse({
        status: 401,
        description: '인증 실패',
    })
    async getDocumentStatistics(@Param('userId') userId: string) {
        return await this.documentService.getDocumentStatistics(userId);
    }
}
