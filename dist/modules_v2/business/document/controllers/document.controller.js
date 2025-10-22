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
const dtos_1 = require("../dtos");
const usecases_1 = require("../usecases");
const approval_enum_1 = require("../../../../common/enums/approval.enum");
const jwt_auth_guard_1 = require("../../../../common/guards/jwt-auth.guard");
const user_decorator_1 = require("../../../../common/decorators/user.decorator");
const employee_entity_1 = require("../../../domain/employee/employee.entity");
let DocumentController = class DocumentController {
    constructor(createDocumentUsecase, updateDocumentUsecase, submitDocumentUsecase, cancelDocumentUsecase, getDocumentUsecase) {
        this.createDocumentUsecase = createDocumentUsecase;
        this.updateDocumentUsecase = updateDocumentUsecase;
        this.submitDocumentUsecase = submitDocumentUsecase;
        this.cancelDocumentUsecase = cancelDocumentUsecase;
        this.getDocumentUsecase = getDocumentUsecase;
    }
    async createDocument(user, dto) {
        return await this.createDocumentUsecase.execute(user.id, dto);
    }
    async updateDocument(user, documentId, dto) {
        return await this.updateDocumentUsecase.execute(user.id, documentId, dto);
    }
    async submitDocument(user, documentId, dto) {
        return await this.submitDocumentUsecase.execute(user.id, documentId, dto);
    }
    async getMyDocuments(user) {
        return await this.getDocumentUsecase.getByDrafter(user.id);
    }
    async getDocumentsByStatus(status) {
        if (!Object.values(approval_enum_1.DocumentStatus).includes(status)) {
            throw new common_1.BadRequestException(`유효하지 않은 문서 상태입니다: ${status}`);
        }
        return await this.getDocumentUsecase.getByStatus(status);
    }
    async getDocument(documentId) {
        return await this.getDocumentUsecase.getById(documentId);
    }
    async deleteDocument(user, documentId) {
        return await this.cancelDocumentUsecase.execute(user.id, documentId);
    }
};
exports.DocumentController = DocumentController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: '문서 생성',
        description: '새로운 문서를 생성합니다 (임시저장 상태)\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 새로운 문서 생성 (임시저장)\n' +
            '- ✅ metadata 없이 문서 생성\n' +
            '- ❌ 필수 필드 누락 (formVersionId, title, content)\n' +
            '- ❌ 존재하지 않는 formVersionId (404 반환)',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '문서 생성 성공', type: dtos_1.DocumentResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 실패' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '양식을 찾을 수 없음' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee, dtos_1.CreateDocumentRequestDto]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "createDocument", null);
__decorate([
    (0, common_1.Put)(':documentId'),
    (0, swagger_1.ApiOperation)({
        summary: '문서 수정',
        description: '임시저장 상태의 문서를 수정합니다\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ DRAFT 상태 문서 수정\n' +
            '- ✅ 일부 필드만 수정\n' +
            '- ❌ 존재하지 않는 문서 ID (404 반환)\n' +
            '- ❌ 제출된 문서(PENDING) 수정 시도 (400 반환)\n' +
            '- ❌ 다른 사용자의 문서 수정 시도 (403 반환)',
    }),
    (0, swagger_1.ApiParam)({ name: 'documentId', description: '문서 ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '문서 수정 성공', type: dtos_1.DocumentResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '문서를 찾을 수 없음' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('documentId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee, String, dtos_1.UpdateDocumentRequestDto]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "updateDocument", null);
__decorate([
    (0, common_1.Post)(':documentId/submit'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '문서 제출',
        description: '문서를 결재선에 제출합니다\n\n' +
            '**결재선 자동 생성 정책:**\n' +
            '- ✅ 문서 양식에 결재선이 설정되어 있으면 해당 결재선 사용\n' +
            '- ✅ 문서 양식에 결재선이 없으면 자동으로 계층적 결재선 생성:\n' +
            '  - 기안자 → 기안자의 부서장 → 상위 부서장 → ... (최상위까지)\n' +
            '  - 기안자가 부서장인 경우 해당 단계는 건너뜀\n' +
            '  - drafterDepartmentId가 없으면 자동으로 기안자의 주 소속 부서 조회\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 문서 제출 (DRAFT → PENDING)\n' +
            '- ✅ 결재선이 없는 양식으로 제출 (자동 결재선 생성)\n' +
            '- ❌ 이미 제출된 문서 재제출 시도 (400 반환)\n' +
            '- ❌ 존재하지 않는 문서 ID (404 반환)\n' +
            '- ❌ 결재선도 없고 부서 정보도 없음 (400 반환)',
    }),
    (0, swagger_1.ApiParam)({ name: 'documentId', description: '문서 ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '문서 제출 성공', type: dtos_1.DocumentResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 실패' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '문서를 찾을 수 없음' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('documentId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee, String, dtos_1.SubmitDocumentRequestDto]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "submitDocument", null);
__decorate([
    (0, common_1.Get)('my-documents'),
    (0, swagger_1.ApiOperation)({
        summary: '내 문서 조회',
        description: '내가 작성한 모든 문서를 조회합니다\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 내가 작성한 모든 문서 조회\n' +
            '- ✅ 작성자 확인 (drafterId 일치)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '문서 목록 조회 성공', type: [dtos_1.DocumentResponseDto] }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 실패' }),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "getMyDocuments", null);
__decorate([
    (0, common_1.Get)('status/:status'),
    (0, swagger_1.ApiOperation)({
        summary: '상태별 문서 조회',
        description: '특정 상태의 모든 문서를 조회합니다\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ DRAFT 상태 문서 조회\n' +
            '- ✅ PENDING 상태 문서 조회\n' +
            '- ✅ APPROVED 상태 문서 조회 (빈 배열 가능)\n' +
            '- ❌ 잘못된 상태 값 (400 반환)',
    }),
    (0, swagger_1.ApiParam)({ name: 'status', enum: approval_enum_1.DocumentStatus, description: '문서 상태' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '문서 목록 조회 성공', type: [dtos_1.DocumentResponseDto] }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 상태 값' }),
    __param(0, (0, common_1.Param)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "getDocumentsByStatus", null);
__decorate([
    (0, common_1.Get)(':documentId'),
    (0, swagger_1.ApiOperation)({
        summary: '문서 조회',
        description: 'ID로 문서를 조회합니다\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 특정 문서 조회\n' +
            '- ✅ 다른 사용자의 문서 조회 가능 (조회 권한)\n' +
            '- ❌ 존재하지 않는 문서 ID (404 반환)',
    }),
    (0, swagger_1.ApiParam)({ name: 'documentId', description: '문서 ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '문서 조회 성공', type: dtos_1.DocumentResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '문서를 찾을 수 없음' }),
    __param(0, (0, common_1.Param)('documentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "getDocument", null);
__decorate([
    (0, common_1.Delete)(':documentId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '문서 삭제',
        description: '임시저장 상태의 문서를 삭제합니다\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ DRAFT 상태 문서 삭제\n' +
            '- ❌ 제출된 문서(PENDING) 삭제 시도 (400 반환)\n' +
            '- ❌ 존재하지 않는 문서 ID (404 반환)\n' +
            '- ❌ 이미 삭제된 문서 재삭제 시도 (404 반환)\n' +
            '- ❌ 다른 사용자의 문서 삭제 시도 (403 반환)',
    }),
    (0, swagger_1.ApiParam)({ name: 'documentId', description: '문서 ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '문서 삭제 성공' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '문서를 찾을 수 없음' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('documentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee, String]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "deleteDocument", null);
exports.DocumentController = DocumentController = __decorate([
    (0, swagger_1.ApiTags)('문서 관리'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [usecases_1.CreateDocumentUsecase,
        usecases_1.UpdateDocumentUsecase,
        usecases_1.SubmitDocumentUsecase,
        usecases_1.CancelDocumentUsecase,
        usecases_1.GetDocumentUsecase])
], DocumentController);
//# sourceMappingURL=document.controller.js.map