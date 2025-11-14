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

    @Get()
    @ApiOperation({
        summary: '문서 목록 조회 (페이징, 필터링)',
        description:
            '문서 목록을 조회합니다. 상태, 기안자, 카테고리, 검색어 등으로 필터링 가능하며 페이징을 지원합니다.\n\n' +
            '**주요 기능:**\n' +
            '- 상태별 필터링 (PENDING 상태는 pendingStepType으로 세분화 가능)\n' +
            '- 카테고리별 필터링\n' +
            '- 제목 검색\n' +
            '- 페이징 처리 (기본 20개)\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 전체 문서 목록 조회\n' +
            '- ✅ 정상: 상태별 필터링 조회\n' +
            '- ✅ 정상: PENDING + 협의 단계 필터링\n' +
            '- ✅ 정상: PENDING + 결재 단계 필터링\n' +
            '- ✅ 정상: 카테고리별 필터링\n' +
            '- ✅ 정상: 제목 검색\n' +
            '- ✅ 정상: 페이징 처리',
    })
    @ApiResponse({
        status: 200,
        description: '문서 목록 조회 성공',
        type: PaginatedDocumentsResponseDto,
    })
    @ApiResponse({
        status: 401,
        description: '인증 실패',
    })
    async getDocuments(@Query() query: QueryDocumentsDto) {
        return await this.documentService.getDocuments({
            status: query.status,
            pendingStepType: query.pendingStepType,
            drafterId: query.drafterId,
            referenceUserId: query.referenceUserId,
            categoryId: query.categoryId,
            searchKeyword: query.searchKeyword,
            startDate: query.startDate ? new Date(query.startDate) : undefined,
            endDate: query.endDate ? new Date(query.endDate) : undefined,
            page: query.page,
            limit: query.limit,
        });
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
