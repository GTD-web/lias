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
exports.TemplateController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../../common/guards/jwt-auth.guard");
const template_service_1 = require("../services/template.service");
const create_template_dto_1 = require("../dtos/create-template.dto");
const update_template_dto_1 = require("../dtos/update-template.dto");
const query_templates_dto_1 = require("../dtos/query-templates.dto");
const template_response_dto_1 = require("../dtos/template-response.dto");
let TemplateController = class TemplateController {
    constructor(templateService) {
        this.templateService = templateService;
    }
    async createTemplate(dto) {
        return await this.templateService.createTemplateWithApprovalSteps(dto);
    }
    async getTemplates(query) {
        return await this.templateService.getTemplates({
            searchKeyword: query.searchKeyword,
            categoryId: query.categoryId,
            sortOrder: query.sortOrder,
            page: query.page,
            limit: query.limit,
        });
    }
    async getTemplate(templateId) {
        return await this.templateService.getTemplate(templateId);
    }
    async updateTemplate(templateId, dto) {
        return await this.templateService.updateTemplate(templateId, dto);
    }
    async deleteTemplate(templateId) {
        await this.templateService.deleteTemplate(templateId);
    }
};
exports.TemplateController = TemplateController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: '문서 템플릿 생성 (결재단계 포함)',
        description: '문서 템플릿과 결재단계 템플릿을 함께 생성합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 문서 템플릿 생성 (결재단계 포함)\n' +
            '- ✅ 정상: 최소 필드만으로 템플릿 생성\n' +
            '- ✅ 정상: 여러 결재단계가 있는 템플릿 생성\n' +
            '- ❌ 실패: 필수 필드 누락 (name)\n' +
            '- ❌ 실패: 필수 필드 누락 (code)\n' +
            '- ❌ 실패: 필수 필드 누락 (template)\n' +
            '- ❌ 실패: 필수 필드 누락 (approvalSteps)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '템플릿 생성 성공',
        type: template_response_dto_1.CreateTemplateResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: '잘못된 요청 (규칙 검증 실패 등)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '인증 실패',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_template_dto_1.CreateTemplateDto]),
    __metadata("design:returntype", Promise)
], TemplateController.prototype, "createTemplate", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: '문서 템플릿 목록 조회',
        description: '문서 템플릿 목록을 조회합니다. 검색, 카테고리 필터, 상태 필터, 정렬, 페이지네이션을 지원합니다.\n\n' +
            '**필터 및 검색:**\n' +
            '- searchKeyword: 템플릿 이름 또는 설명에서 검색\n' +
            '- categoryId: 특정 카테고리로 필터링\n' +
            '- status: 템플릿 상태로 필터링 (DRAFT, ACTIVE, DEPRECATED)\n\n' +
            '**정렬:**\n' +
            '- sortOrder: LATEST (최신순, 기본값), OLDEST (오래된순)\n\n' +
            '**페이지네이션:**\n' +
            '- page: 페이지 번호 (1부터 시작, 기본값: 1)\n' +
            '- limit: 페이지당 항목 수 (기본값: 20, 최대: 100)\n\n' +
            '**응답 형식:**\n' +
            '```json\n' +
            '{\n' +
            '  "data": [...],\n' +
            '  "pagination": {\n' +
            '    "page": 1,\n' +
            '    "limit": 20,\n' +
            '    "totalItems": 100,\n' +
            '    "totalPages": 5\n' +
            '  }\n' +
            '}\n' +
            '```\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 전체 템플릿 목록 조회 (페이지네이션 포함)\n' +
            '- ✅ 정상: 검색어로 템플릿 검색\n' +
            '- ✅ 정상: 카테고리별 필터링 조회\n' +
            '- ✅ 정상: 상태별 필터링 조회\n' +
            '- ✅ 정상: 최신순/오래된순 정렬\n' +
            '- ✅ 정상: 페이지네이션 적용',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '문서 템플릿 목록 조회 성공',
        schema: {
            properties: {
                data: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/DocumentTemplateResponseDto' },
                },
                pagination: {
                    type: 'object',
                    properties: {
                        page: { type: 'number', example: 1 },
                        limit: { type: 'number', example: 20 },
                        totalItems: { type: 'number', example: 100 },
                        totalPages: { type: 'number', example: 5 },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '인증 실패',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_templates_dto_1.QueryTemplatesDto]),
    __metadata("design:returntype", Promise)
], TemplateController.prototype, "getTemplates", null);
__decorate([
    (0, common_1.Get)(':templateId'),
    (0, swagger_1.ApiOperation)({
        summary: '문서 템플릿 상세 조회',
        description: '특정 문서 템플릿의 상세 정보를 조회합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 문서 템플릿 상세 조회\n' +
            '- ❌ 실패: 존재하지 않는 템플릿 ID\n' +
            '- ❌ 실패: 잘못된 UUID 형식',
    }),
    (0, swagger_1.ApiParam)({
        name: 'templateId',
        description: '문서 템플릿 ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '문서 템플릿 상세 조회 성공',
        type: template_response_dto_1.DocumentTemplateResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: '문서 템플릿을 찾을 수 없음',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '인증 실패',
    }),
    __param(0, (0, common_1.Param)('templateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TemplateController.prototype, "getTemplate", null);
__decorate([
    (0, common_1.Put)(':templateId'),
    (0, swagger_1.ApiOperation)({
        summary: '문서 템플릿 수정',
        description: '문서 템플릿 정보를 수정합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 문서 템플릿 수정\n' +
            '- ✅ 정상: 부분 수정 (name만)\n' +
            '- ✅ 정상: 결재단계 수정\n' +
            '- ❌ 실패: 존재하지 않는 템플릿 ID',
    }),
    (0, swagger_1.ApiParam)({
        name: 'templateId',
        description: '문서 템플릿 ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '문서 템플릿 수정 성공',
        type: template_response_dto_1.DocumentTemplateResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: '문서 템플릿을 찾을 수 없음',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: '잘못된 요청',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '인증 실패',
    }),
    __param(0, (0, common_1.Param)('templateId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_template_dto_1.UpdateTemplateDto]),
    __metadata("design:returntype", Promise)
], TemplateController.prototype, "updateTemplate", null);
__decorate([
    (0, common_1.Delete)(':templateId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({
        summary: '문서 템플릿 삭제',
        description: '문서 템플릿을 삭제합니다. 연결된 결재단계 템플릿이 있으면 삭제할 수 없습니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 문서 템플릿 삭제\n' +
            '- ❌ 실패: 존재하지 않는 템플릿 삭제\n' +
            '- ❌ 실패: 연결된 결재단계 템플릿이 있는 템플릿 삭제',
    }),
    (0, swagger_1.ApiParam)({
        name: 'templateId',
        description: '문서 템플릿 ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: '문서 템플릿 삭제 성공',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: '문서 템플릿을 찾을 수 없음',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: '연결된 결재단계 템플릿이 있어 삭제할 수 없음',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '인증 실패',
    }),
    __param(0, (0, common_1.Param)('templateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TemplateController.prototype, "deleteTemplate", null);
exports.TemplateController = TemplateController = __decorate([
    (0, swagger_1.ApiTags)('템플릿 관리'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('templates'),
    __metadata("design:paramtypes", [template_service_1.TemplateService])
], TemplateController);
//# sourceMappingURL=template.controller.js.map