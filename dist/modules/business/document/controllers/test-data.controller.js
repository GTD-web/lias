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
exports.TestDataController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const test_data_service_1 = require("../services/test-data.service");
let TestDataController = class TestDataController {
    constructor(testDataService) {
        this.testDataService = testDataService;
    }
    async getWebPartEmployees() {
        return await this.testDataService.getWebPartEmployeeList();
    }
    async getAvailableTemplates() {
        return await this.testDataService.getAvailableTemplates();
    }
    async createTestDocument(body) {
        return await this.testDataService.createTestDocument(body);
    }
    async createAndSubmitTestDocument(body) {
        return await this.testDataService.createAndSubmitTestDocument(body);
    }
    async createMultipleTestDocuments(count, submit) {
        const documentCount = Math.min(Math.max(Number(count) || 1, 1), 100);
        return await this.testDataService.createMultipleTestDocuments(documentCount, submit === true);
    }
    async deleteAllTestData() {
        return await this.testDataService.deleteAllTestData();
    }
    async deleteDocumentsOnly() {
        return await this.testDataService.deleteDocumentsOnly();
    }
    async deleteTestCategory() {
        return await this.testDataService.deleteTestCategory();
    }
};
exports.TestDataController = TestDataController;
__decorate([
    (0, common_1.Get)('employees/web-part'),
    (0, swagger_1.ApiOperation)({
        summary: 'Web파트 부서원 목록 조회',
        description: 'Web파트 부서에 속한 직원 목록을 조회합니다. 테스트 데이터 생성 시 이 직원들이 사용됩니다.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Web파트 부서원 목록 조회 성공',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Web파트 부서 또는 부서원을 찾을 수 없음',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestDataController.prototype, "getWebPartEmployees", null);
__decorate([
    (0, common_1.Get)('templates'),
    (0, swagger_1.ApiOperation)({
        summary: '사용 가능한 템플릿 목록 조회',
        description: '테스트 문서 생성 시 사용할 수 있는 템플릿 목록을 조회합니다.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '템플릿 목록 조회 성공',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestDataController.prototype, "getAvailableTemplates", null);
__decorate([
    (0, common_1.Post)('documents/create'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: '테스트 문서 생성 (기안 안 함)',
        description: 'Web파트 부서원을 기반으로 테스트 문서를 생성합니다. 문서는 임시저장 상태로 생성되며 기안되지 않습니다.\n\n' +
            '**기능:**\n' +
            '- Web파트 부서원 중 랜덤으로 기안자 선택\n' +
            '- 결재라인 자동 구성 (협의자, 결재자, 시행자)\n' +
            '- 모든 결재 단계는 FIXED 타입 (직원 ID 직접 할당)',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                templateCodeOrName: {
                    type: 'string',
                    description: '템플릿 코드 또는 이름 (생략 시 최신 템플릿 사용)',
                    example: 'APPROVAL_FORM_001',
                },
                title: {
                    type: 'string',
                    description: '문서 제목 (생략 시 자동 생성)',
                    example: '테스트 문서',
                },
                hasAgreement: {
                    type: 'boolean',
                    description: '협의자 포함 여부',
                    default: false,
                },
                hasImplementation: {
                    type: 'boolean',
                    description: '시행자 포함 여부',
                    default: true,
                },
                approvalCount: {
                    type: 'number',
                    description: '결재자 수 (최소 1, 최대 5)',
                    default: 2,
                    minimum: 1,
                    maximum: 5,
                },
                hasReference: {
                    type: 'boolean',
                    description: '참조자 포함 여부',
                    default: true,
                },
                referenceCount: {
                    type: 'number',
                    description: '참조자 수 (최소 1, 최대 3)',
                    default: 1,
                    minimum: 1,
                    maximum: 3,
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '테스트 문서 생성 성공',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Web파트 부서 또는 템플릿을 찾을 수 없음',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestDataController.prototype, "createTestDocument", null);
__decorate([
    (0, common_1.Post)('documents/create-and-submit'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: '테스트 문서 생성 및 즉시 기안',
        description: 'Web파트 부서원을 기반으로 테스트 문서를 생성하고 즉시 기안합니다.\n\n' +
            '**기능:**\n' +
            '- Web파트 부서원 중 랜덤으로 기안자 선택\n' +
            '- 결재라인 자동 구성 (협의자, 결재자, 시행자)\n' +
            '- 모든 결재 단계는 FIXED 타입 (직원 ID 직접 할당)\n' +
            '- 문서 생성 후 즉시 기안',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                templateCodeOrName: {
                    type: 'string',
                    description: '템플릿 코드 또는 이름 (생략 시 최신 템플릿 사용)',
                    example: 'APPROVAL_FORM_001',
                },
                title: {
                    type: 'string',
                    description: '문서 제목 (생략 시 자동 생성)',
                    example: '테스트 문서',
                },
                hasAgreement: {
                    type: 'boolean',
                    description: '협의자 포함 여부',
                    default: false,
                },
                hasImplementation: {
                    type: 'boolean',
                    description: '시행자 포함 여부',
                    default: true,
                },
                approvalCount: {
                    type: 'number',
                    description: '결재자 수 (최소 1, 최대 5)',
                    default: 2,
                    minimum: 1,
                    maximum: 5,
                },
                hasReference: {
                    type: 'boolean',
                    description: '참조자 포함 여부',
                    default: true,
                },
                referenceCount: {
                    type: 'number',
                    description: '참조자 수 (최소 1, 최대 3)',
                    default: 1,
                    minimum: 1,
                    maximum: 3,
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '테스트 문서 생성 및 기안 성공',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Web파트 부서 또는 템플릿을 찾을 수 없음',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: '결재라인 구성 실패 (결재자 또는 시행자 부족)',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestDataController.prototype, "createAndSubmitTestDocument", null);
__decorate([
    (0, common_1.Post)('documents/create-multiple'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: '여러 개의 테스트 문서 일괄 생성',
        description: '지정한 개수만큼 테스트 문서를 일괄 생성합니다. 각 문서는 랜덤한 옵션으로 생성됩니다.\n\n' +
            '**기능:**\n' +
            '- 지정한 개수만큼 문서 생성\n' +
            '- 각 문서마다 랜덤한 결재라인 구성\n' +
            '- 협의자/시행자 포함 여부 랜덤\n' +
            '- 즉시 기안 옵션',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'count',
        description: '생성할 문서 개수',
        required: true,
        type: Number,
        example: 10,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'submit',
        description: '즉시 기안 여부',
        required: false,
        type: Boolean,
        example: false,
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '테스트 문서 일괄 생성 성공',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Web파트 부서 또는 템플릿을 찾을 수 없음',
    }),
    __param(0, (0, common_1.Query)('count')),
    __param(1, (0, common_1.Query)('submit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean]),
    __metadata("design:returntype", Promise)
], TestDataController.prototype, "createMultipleTestDocuments", null);
__decorate([
    (0, common_1.Post)('cleanup/all'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '⚠️ 테스트 데이터 전체 삭제',
        description: '모든 테스트 데이터를 삭제합니다. **주의: 이 작업은 되돌릴 수 없습니다!**\n\n' +
            '**삭제 순서:**\n' +
            '1. ApprovalStepSnapshot (결재 단계 스냅샷)\n' +
            '2. Document (문서)\n' +
            '3. ApprovalStepTemplate (결재 단계 템플릿)\n' +
            '4. DocumentTemplate (문서 템플릿)\n' +
            '5. Category (카테고리)\n\n' +
            '⚠️ **경고**: 모든 문서, 템플릿, 카테고리가 삭제됩니다!',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '테스트 데이터 전체 삭제 성공',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                message: { type: 'string' },
                deleted: {
                    type: 'object',
                    properties: {
                        approvalStepSnapshots: { type: 'number' },
                        documents: { type: 'number' },
                        approvalStepTemplates: { type: 'number' },
                        documentTemplates: { type: 'number' },
                        categories: { type: 'number' },
                    },
                },
                total: { type: 'number' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: '삭제 실패',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestDataController.prototype, "deleteAllTestData", null);
__decorate([
    (0, common_1.Post)('cleanup/documents'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '문서 데이터만 삭제 (템플릿/카테고리 유지)',
        description: '문서와 결재 단계 스냅샷만 삭제하고, 템플릿과 카테고리는 유지합니다.\n\n' +
            '**삭제 항목:**\n' +
            '- ApprovalStepSnapshot (결재 단계 스냅샷)\n' +
            '- Document (문서)\n\n' +
            '**유지 항목:**\n' +
            '- ApprovalStepTemplate (결재 단계 템플릿)\n' +
            '- DocumentTemplate (문서 템플릿)\n' +
            '- Category (카테고리)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '문서 데이터 삭제 성공',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: '삭제 실패',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestDataController.prototype, "deleteDocumentsOnly", null);
__decorate([
    (0, common_1.Post)('cleanup/test-category'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '테스트 카테고리만 삭제',
        description: '코드가 "TEST_CATEGORY"인 테스트 카테고리와 해당 카테고리의 템플릿들을 삭제합니다.\n\n' +
            '**삭제 항목:**\n' +
            '- TEST_CATEGORY 카테고리\n' +
            '- 해당 카테고리의 모든 템플릿\n' +
            '- 해당 템플릿의 결재 단계 템플릿',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '테스트 카테고리 삭제 성공',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: '삭제 실패',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestDataController.prototype, "deleteTestCategory", null);
exports.TestDataController = TestDataController = __decorate([
    (0, swagger_1.ApiTags)('🧪 테스트 데이터'),
    (0, common_1.Controller)('test-data'),
    __metadata("design:paramtypes", [test_data_service_1.TestDataService])
], TestDataController);
//# sourceMappingURL=test-data.controller.js.map