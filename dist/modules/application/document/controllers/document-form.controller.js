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
exports.DocumentFormController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_responses_decorator_1 = require("../../../../common/decorators/api-responses.decorator");
const document_service_1 = require("../document.service");
const document_form_dto_1 = require("../dtos/document-form.dto");
const pagination_query_dto_1 = require("../../../../common/dtos/pagination-query.dto");
const employee_entity_1 = require("../../../../database/entities/employee.entity");
const user_decorator_1 = require("../../../../common/decorators/user.decorator");
const jwt_auth_guard_1 = require("../../../../common/guards/jwt-auth.guard");
let DocumentFormController = class DocumentFormController {
    constructor(documentService) {
        this.documentService = documentService;
    }
    async createDocumentForm(createDocumentFormDto) {
        return await this.documentService.createDocumentForm(createDocumentFormDto);
    }
    async findAllDocumentForms(query) {
        return await this.documentService.findDocumentForms(query);
    }
    async findDocumentFormById(user, id) {
        console.log('id', id);
        return await this.documentService.findDocumentFormById(id, user);
    }
    async updateDocumentFormById(id, updateDocumentFormDto) {
        return await this.documentService.updateDocumentForm(id, updateDocumentFormDto);
    }
    async deleteDocumentFormById(id) {
        return await this.documentService.deleteDocumentForm(id);
    }
};
exports.DocumentFormController = DocumentFormController;
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiOperation)({ summary: '문서양식 생성' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '문서양식을 성공적으로 생성했습니다.',
        type: document_form_dto_1.DocumentFormResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [document_form_dto_1.CreateDocumentFormDto]),
    __metadata("design:returntype", Promise)
], DocumentFormController.prototype, "createDocumentForm", null);
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOperation)({ summary: '문서양식 목록 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '문서양식 목록을 성공적으로 조회했습니다.',
        type: [document_form_dto_1.DocumentFormResponseDto],
        isPaginated: true,
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", Promise)
], DocumentFormController.prototype, "findAllDocumentForms", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '문서양식 상세 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '문서양식을 성공적으로 상세 조회했습니다.',
        type: document_form_dto_1.DocumentFormResponseDto,
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee, String]),
    __metadata("design:returntype", Promise)
], DocumentFormController.prototype, "findDocumentFormById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '문서양식 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '문서양식을 성공적으로 수정했습니다.',
        type: document_form_dto_1.DocumentFormResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, document_form_dto_1.UpdateDocumentFormDto]),
    __metadata("design:returntype", Promise)
], DocumentFormController.prototype, "updateDocumentFormById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '문서양식 삭제' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '문서양식을 성공적으로 삭제했습니다.',
        type: 'boolean',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DocumentFormController.prototype, "deleteDocumentFormById", null);
exports.DocumentFormController = DocumentFormController = __decorate([
    (0, swagger_1.ApiTags)('문서양식'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('forms'),
    __metadata("design:paramtypes", [document_service_1.DocumentService])
], DocumentFormController);
//# sourceMappingURL=document-form.controller.js.map