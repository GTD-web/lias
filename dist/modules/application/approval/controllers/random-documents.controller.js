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
exports.RandomDocumentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_random_documents_usecase_1 = require("../usecases/test/create-random-documents.usecase");
let RandomDocumentsController = class RandomDocumentsController {
    constructor(createRandomDocumentsUseCase) {
        this.createRandomDocumentsUseCase = createRandomDocumentsUseCase;
    }
    async createRandomDocuments(count) {
        const result = await this.createRandomDocumentsUseCase.execute(count || 20);
        return {
            message: '랜덤 문서 생성이 완료되었습니다.',
            data: {
                createdCount: result.documents.length,
                employees: result.employees.length,
                departments: result.departments.length,
                documentTypes: result.documentTypes.length,
                documentForms: result.documentForms.length,
                approvalSteps: result.approvalSteps.length,
            },
            details: {
                documents: result.documents.map((doc) => ({
                    documentId: doc.documentId,
                    title: doc.title,
                    status: doc.status,
                    drafterId: doc.drafterId,
                    createdAt: doc.createdAt,
                })),
            },
        };
    }
    async deleteRandomDocuments() {
        await this.createRandomDocumentsUseCase.deleteAll();
        return {
            message: '랜덤 문서 삭제가 완료되었습니다.',
            data: {
                deletedCount: 0,
            },
        };
    }
};
exports.RandomDocumentsController = RandomDocumentsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: '랜덤 문서 생성',
        description: '랜덤한 사용자들이 랜덤한 기안문서를 상신한 데이터를 생성합니다.',
    }),
    (0, swagger_1.ApiQuery)({ name: 'count', required: false, description: '생성할 문서 개수 (기본값: 20)', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '랜덤 문서 생성 성공' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: '서버 오류' }),
    __param(0, (0, common_1.Query)('count')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RandomDocumentsController.prototype, "createRandomDocuments", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({ summary: '랜덤 문서 삭제', description: '생성된 랜덤 문서들을 모두 삭제합니다.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '랜덤 문서 삭제 성공' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: '서버 오류' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RandomDocumentsController.prototype, "deleteRandomDocuments", null);
exports.RandomDocumentsController = RandomDocumentsController = __decorate([
    (0, swagger_1.ApiTags)('랜덤 문서 생성'),
    (0, common_1.Controller)('api/v2/approval/random-documents'),
    __metadata("design:paramtypes", [create_random_documents_usecase_1.CreateRandomDocumentsUseCase])
], RandomDocumentsController);
//# sourceMappingURL=random-documents.controller.js.map