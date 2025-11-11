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
const template_service_1 = require("../services/template.service");
const create_template_dto_1 = require("../dtos/create-template.dto");
const update_template_dto_1 = require("../dtos/update-template.dto");
const approval_enum_1 = require("../../../../common/enums/approval.enum");
let TemplateController = class TemplateController {
    constructor(templateService) {
        this.templateService = templateService;
    }
    async createTemplate(dto) {
        return await this.templateService.createTemplateWithApprovalSteps(dto);
    }
    async getTemplates(categoryId, status) {
        return await this.templateService.getTemplates(categoryId, status);
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
        description: '문서 템플릿 목록을 조회합니다. 카테고리 또는 상태로 필터링 가능합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 전체 템플릿 목록 조회\n' +
            '- ✅ 정상: 카테고리별 필터링 조회\n' +
            '- ✅ 정상: 상태별 필터링 조회',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'categoryId',
        required: false,
        description: '카테고리 ID',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        required: false,
        enum: approval_enum_1.DocumentTemplateStatus,
        description: '템플릿 상태',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '문서 템플릿 목록 조회 성공',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '인증 실패',
    }),
    __param(0, (0, common_1.Query)('categoryId')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
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
    (0, common_1.Controller)('templates'),
    __metadata("design:paramtypes", [template_service_1.TemplateService])
], TemplateController);
//# sourceMappingURL=template.controller.js.map