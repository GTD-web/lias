"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const document_service_1 = require("../services/document.service");
const dtos_1 = require("../dtos");
let DocumentController = class DocumentController {
    constructor(documentService) {
        this.documentService = documentService;
    }
    async createDocument(dto) {
        return await this.documentService.createDocument(dto);
    }
    async getDocuments(query) {
        return await this.documentService.getDocuments({
            status: query.status,
            pendingStepType: query.pendingStepType,
            drafterId: query.drafterId,
            categoryId: query.categoryId,
            searchKeyword: query.searchKeyword,
            startDate: query.startDate ? new Date(query.startDate) : undefined,
            endDate: query.endDate ? new Date(query.endDate) : undefined,
            page: query.page,
            limit: query.limit,
        });
    }
    async getDocument(documentId) {
        return await this.documentService.getDocument(documentId);
    }
    async updateDocument(documentId, dto) {
        return await this.documentService.updateDocument(documentId, dto);
    }
    async deleteDocument(documentId) {
        await this.documentService.deleteDocument(documentId);
    }
    async submitDocument(documentId, dto) {
        return await this.documentService.submitDocument({
            documentId,
            ...dto,
        });
    }
    async submitDocumentDirect(dto) {
        return await this.documentService.submitDocumentDirect(dto);
    }
    async getTemplateForNewDocument(templateId, drafterId) {
        return await this.documentService.getTemplateForNewDocument(templateId, drafterId);
    }
};
exports.DocumentController = DocumentController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: '문서 생성 (임시저장)',
        description: '문서를 임시저장 상태로 생성합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 문서 생성\n' +
            '- ❌ 실패: 필수 필드 누락 (drafterId)\n' +
            '- ❌ 실패: 존재하지 않는 documentTemplateId',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '문서 생성 성공',
        type: dtos_1.DocumentResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: '잘못된 요청',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '인증 실패',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateDocumentDto]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "createDocument", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: '문서 목록 조회 (페이징, 필터링)',
        description: '문서 목록을 조회합니다. 상태, 기안자, 카테고리, 검색어 등으로 필터링 가능하며 페이징을 지원합니다.\n\n' +
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '문서 목록 조회 성공',
        type: dtos_1.PaginatedDocumentsResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '인증 실패',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.QueryDocumentsDto]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "getDocuments", null);
__decorate([
    (0, common_1.Get)(':documentId'),
    (0, swagger_1.ApiOperation)({
        summary: '문서 상세 조회',
        description: '특정 문서의 상세 정보를 조회합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 문서 상세 조회\n' +
            '- ❌ 실패: 존재하지 않는 문서 ID',
    }),
    (0, swagger_1.ApiParam)({
        name: 'documentId',
        description: '문서 ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '문서 상세 조회 성공',
        type: dtos_1.DocumentResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: '문서를 찾을 수 없음',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '인증 실패',
    }),
    __param(0, (0, common_1.Param)('documentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "getDocument", null);
__decorate([
    (0, common_1.Put)(':documentId'),
    (0, swagger_1.ApiOperation)({
        summary: '문서 수정',
        description: '임시저장 상태의 문서를 수정합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 문서 수정\n' +
            '- ❌ 실패: 존재하지 않는 문서 ID',
    }),
    (0, swagger_1.ApiParam)({
        name: 'documentId',
        description: '문서 ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '문서 수정 성공',
        type: dtos_1.DocumentResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: '문서를 찾을 수 없음',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: '잘못된 요청 (임시저장 상태가 아님)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '인증 실패',
    }),
    __param(0, (0, common_1.Param)('documentId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateDocumentDto]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "updateDocument", null);
__decorate([
    (0, common_1.Delete)(':documentId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({
        summary: '문서 삭제',
        description: '임시저장 상태의 문서를 삭제합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 문서 삭제\n' +
            '- ❌ 실패: 존재하지 않는 문서 삭제\n' +
            '- ❌ 실패: 이미 제출된 문서 삭제',
    }),
    (0, swagger_1.ApiParam)({
        name: 'documentId',
        description: '문서 ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: '문서 삭제 성공',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: '문서를 찾을 수 없음',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: '잘못된 요청 (임시저장 상태가 아님)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '인증 실패',
    }),
    __param(0, (0, common_1.Param)('documentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "deleteDocument", null);
__decorate([
    (0, common_1.Post)(':documentId/submit'),
    (0, swagger_1.ApiOperation)({
        summary: '문서 기안',
        description: '임시저장된 문서를 기안합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 문서 기안\n' +
            '- ❌ 실패: 이미 제출된 문서 재제출',
    }),
    (0, swagger_1.ApiParam)({
        name: 'documentId',
        description: '기안할 문서 ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '문서 기안 성공',
        type: dtos_1.SubmitDocumentResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: '문서를 찾을 수 없음',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: '잘못된 요청 (임시저장 상태가 아님)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '인증 실패',
    }),
    __param(0, (0, common_1.Param)('documentId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "submitDocument", null);
__decorate([
    (0, common_1.Post)('submit-direct'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: '바로 기안',
        description: '임시저장 단계를 건너뛰고 바로 기안합니다. 내부적으로 임시저장 후 기안하는 방식으로 처리됩니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 바로 기안\n' +
            '- ❌ 실패: 필수 필드 누락',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '문서 기안 성공',
        type: dtos_1.SubmitDocumentResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: '잘못된 요청',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '인증 실패',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.SubmitDocumentDirectDto]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "submitDocumentDirect", null);
__decorate([
    (0, common_1.Get)('templates/:templateId'),
    (0, swagger_1.ApiOperation)({
        summary: '새 문서 작성용 템플릿 상세 조회',
        description: '새 문서 작성 시 사용할 템플릿의 상세 정보를 조회합니다. AssigneeRule을 기반으로 실제 적용될 결재자 정보가 맵핑되어 반환됩니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 템플릿 상세 조회\n' +
            '- ✅ 정상 또는 실패: drafterId 없이 조회\n' +
            '- ❌ 실패: 존재하지 않는 템플릿 ID',
    }),
    (0, swagger_1.ApiParam)({
        name: 'templateId',
        description: '문서 템플릿 ID',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'drafterId',
        required: true,
        description: '기안자 ID (결재자 정보 맵핑을 위해 필요)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '템플릿 상세 조회 성공 (결재자 정보 맵핑 포함)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: '템플릿 또는 기안자를 찾을 수 없음',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: '잘못된 요청 (기안자의 부서/직책 정보 없음)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '인증 실패',
    }),
    __param(0, (0, common_1.Param)('templateId')),
    __param(1, (0, common_1.Query)('drafterId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "getTemplateForNewDocument", null);
exports.DocumentController = DocumentController = __decorate([
    (0, swagger_1.ApiTags)('문서 관리'),
    (0, common_1.Controller)('documents'),
    __metadata("design:paramtypes", [document_service_1.DocumentService])
], DocumentController);
//# sourceMappingURL=document.controller.js.map