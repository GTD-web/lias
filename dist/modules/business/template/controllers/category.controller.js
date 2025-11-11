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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const template_service_1 = require("../services/template.service");
const category_dto_1 = require("../dtos/category.dto");
let CategoryController = class CategoryController {
    constructor(templateService) {
        this.templateService = templateService;
    }
    async createCategory(dto) {
        return await this.templateService.createCategory(dto);
    }
    async getCategories() {
        return await this.templateService.getCategories();
    }
    async getCategory(categoryId) {
        return await this.templateService.getCategory(categoryId);
    }
    async updateCategory(categoryId, dto) {
        return await this.templateService.updateCategory(categoryId, dto);
    }
    async deleteCategory(categoryId) {
        await this.templateService.deleteCategory(categoryId);
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: '카테고리 생성',
        description: '새로운 카테고리를 생성합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 카테고리 생성\n' +
            '- ✅ 정상: 최소 필드만으로 카테고리 생성\n' +
            '- ❌ 실패: 필수 필드 누락 (name)\n' +
            '- ❌ 실패: 필수 필드 누락 (code)\n' +
            '- ❌ 실패: 중복된 코드',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '카테고리 생성 성공',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: '잘못된 요청 (코드 중복 등)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '인증 실패',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: '카테고리 목록 조회',
        description: '모든 카테고리 목록을 조회합니다. 정렬 순서대로 반환됩니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 카테고리 목록 조회',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '카테고리 목록 조회 성공',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '인증 실패',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Get)(':categoryId'),
    (0, swagger_1.ApiOperation)({
        summary: '카테고리 상세 조회',
        description: '특정 카테고리의 상세 정보를 조회합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 카테고리 상세 조회\n' +
            '- ❌ 실패: 존재하지 않는 카테고리 ID\n' +
            '- ❌ 실패: 잘못된 UUID 형식',
    }),
    (0, swagger_1.ApiParam)({
        name: 'categoryId',
        description: '카테고리 ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '카테고리 상세 조회 성공',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: '카테고리를 찾을 수 없음',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '인증 실패',
    }),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategory", null);
__decorate([
    (0, common_1.Put)(':categoryId'),
    (0, swagger_1.ApiOperation)({
        summary: '카테고리 수정',
        description: '카테고리 정보를 수정합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 카테고리 수정\n' +
            '- ✅ 정상: 부분 수정 (name만)\n' +
            '- ❌ 실패: 존재하지 않는 카테고리 ID',
    }),
    (0, swagger_1.ApiParam)({
        name: 'categoryId',
        description: '카테고리 ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '카테고리 수정 성공',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: '카테고리를 찾을 수 없음',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: '잘못된 요청 (코드 중복 등)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '인증 실패',
    }),
    __param(0, (0, common_1.Param)('categoryId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Delete)(':categoryId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({
        summary: '카테고리 삭제',
        description: '카테고리를 삭제합니다. 연결된 문서 템플릿이 있으면 삭제할 수 없습니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 카테고리 삭제\n' +
            '- ❌ 실패: 존재하지 않는 카테고리 삭제\n' +
            '- ❌ 실패: 연결된 템플릿이 있는 카테고리 삭제',
    }),
    (0, swagger_1.ApiParam)({
        name: 'categoryId',
        description: '카테고리 ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: '카테고리 삭제 성공',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: '카테고리를 찾을 수 없음',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: '연결된 문서 템플릿이 있어 삭제할 수 없음',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: '인증 실패',
    }),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategory", null);
exports.CategoryController = CategoryController = __decorate([
    (0, swagger_1.ApiTags)('카테고리 관리'),
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [template_service_1.TemplateService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map