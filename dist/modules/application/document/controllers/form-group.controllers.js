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
exports.FormGroupController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_responses_decorator_1 = require("../../../../common/decorators/api-responses.decorator");
const document_service_1 = require("../document.service");
let FormGroupController = class FormGroupController {
    constructor(documentService) {
        this.documentService = documentService;
    }
    async createFormGroup() {
        return [];
    }
    async findAllFormGroups() {
        return [];
    }
    async findFormGroupById(id) {
        return [];
    }
    async updateFormGroupById(id) {
        return [];
    }
    async deleteFormGroupById(id) {
        return [];
    }
};
exports.FormGroupController = FormGroupController;
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiOperation)({ summary: '문서양식그룹 생성' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '문서양식그룹을 성공적으로 생성했습니다.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FormGroupController.prototype, "createFormGroup", null);
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOperation)({ summary: '문서양식그룹 목록 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '문서양식그룹 목록을 성공적으로 조회했습니다.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FormGroupController.prototype, "findAllFormGroups", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '문서양식그룹 상세 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '문서양식그룹을 성공적으로 상세 조회했습니다.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FormGroupController.prototype, "findFormGroupById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '문서양식그룹 수정' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '문서양식그룹을 성공적으로 수정했습니다.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FormGroupController.prototype, "updateFormGroupById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '문서양식그룹 삭제' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '문서양식그룹을 성공적으로 삭제했습니다.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FormGroupController.prototype, "deleteFormGroupById", null);
exports.FormGroupController = FormGroupController = __decorate([
    (0, swagger_1.ApiTags)('문서양식그룹'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('form-groups'),
    __metadata("design:paramtypes", [document_service_1.DocumentService])
], FormGroupController);
//# sourceMappingURL=form-group.controllers.js.map