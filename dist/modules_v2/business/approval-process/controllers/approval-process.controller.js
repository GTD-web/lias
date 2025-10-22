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
exports.ApprovalProcessController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dtos_1 = require("../dtos");
const usecases_1 = require("../usecases");
const jwt_auth_guard_1 = require("../../../../common/guards/jwt-auth.guard");
const user_decorator_1 = require("../../../../common/decorators/user.decorator");
const employee_entity_1 = require("../../../domain/employee/employee.entity");
let ApprovalProcessController = class ApprovalProcessController {
    constructor(approveStepUsecase, rejectStepUsecase, completeAgreementUsecase, completeImplementationUsecase, cancelApprovalUsecase, getApprovalStatusUsecase) {
        this.approveStepUsecase = approveStepUsecase;
        this.rejectStepUsecase = rejectStepUsecase;
        this.completeAgreementUsecase = completeAgreementUsecase;
        this.completeImplementationUsecase = completeImplementationUsecase;
        this.cancelApprovalUsecase = cancelApprovalUsecase;
        this.getApprovalStatusUsecase = getApprovalStatusUsecase;
    }
    async approveStep(user, dto) {
        return await this.approveStepUsecase.execute(user.id, dto);
    }
    async rejectStep(user, dto) {
        return await this.rejectStepUsecase.execute(user.id, dto);
    }
    async completeAgreement(user, dto) {
        return await this.completeAgreementUsecase.execute(user.id, dto);
    }
    async completeImplementation(user, dto) {
        return await this.completeImplementationUsecase.execute(user.id, dto);
    }
    async cancelApproval(user, dto) {
        return await this.cancelApprovalUsecase.execute(user.id, dto);
    }
    async getMyPendingApprovals(user) {
        return await this.getApprovalStatusUsecase.getMyPendingApprovals(user.id);
    }
    async getApprovalSteps(documentId) {
        return await this.getApprovalStatusUsecase.getApprovalSteps(documentId);
    }
};
exports.ApprovalProcessController = ApprovalProcessController;
__decorate([
    (0, common_1.Post)('approve'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '결재 승인',
        description: '결재 단계를 승인합니다\n\n' +
            '**순서 검증 규칙:**\n' +
            '1. 협의가 있다면 모든 협의가 완료되어야 결재 가능\n' +
            '2. 이전 결재 단계가 완료되어야 현재 단계 승인 가능\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 결재 승인 (의견 포함)\n' +
            '- ✅ 의견 없이 승인\n' +
            '- ❌ 필수 필드 누락 (stepSnapshotId)\n' +
            '- ❌ 존재하지 않는 stepSnapshotId (404 반환)\n' +
            '- ❌ 권한 없는 사용자(기안자)가 승인 시도 (403 반환)\n' +
            '- ❌ 이미 승인된 단계 재승인 시도 (400 반환)\n' +
            '- ❌ 협의가 완료되지 않은 상태에서 결재 시도 (400 반환)\n' +
            '- ❌ 이전 결재 단계가 완료되지 않은 상태에서 결재 시도 (400 반환)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '결재 승인 성공', type: dtos_1.ApprovalStepResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청 (순서 위반 포함)' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 실패' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '권한 없음' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '결재 단계를 찾을 수 없음' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee, dtos_1.ApproveStepRequestDto]),
    __metadata("design:returntype", Promise)
], ApprovalProcessController.prototype, "approveStep", null);
__decorate([
    (0, common_1.Post)('reject'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '결재 반려',
        description: '결재 단계를 반려합니다\n\n' +
            '**순서 검증 규칙:**\n' +
            '1. 협의가 있다면 모든 협의가 완료되어야 반려 가능\n' +
            '2. 이전 결재 단계가 완료되어야 현재 단계 반려 가능\n' +
            '(반려도 차례가 되어야 가능)\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 결재 반려 (사유 포함)\n' +
            '- ❌ 필수 필드 누락 (stepSnapshotId, comment)\n' +
            '- ❌ 존재하지 않는 stepSnapshotId (404 반환)\n' +
            '- ❌ 권한 없는 사용자가 반려 시도 (403 반환)\n' +
            '- ❌ 협의가 완료되지 않은 상태에서 반려 시도 (400 반환)\n' +
            '- ❌ 이전 결재 단계가 완료되지 않은 상태에서 반려 시도 (400 반환)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '결재 반려 성공', type: dtos_1.ApprovalStepResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청 (반려 사유 필수, 순서 위반 포함)' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 실패' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '권한 없음' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '결재 단계를 찾을 수 없음' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee, dtos_1.RejectStepRequestDto]),
    __metadata("design:returntype", Promise)
], ApprovalProcessController.prototype, "rejectStep", null);
__decorate([
    (0, common_1.Post)('agreement/complete'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '협의 완료',
        description: '협의 단계를 완료 처리합니다\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 협의 완료 (의견 포함)\n' +
            '- ❌ 필수 필드 누락 (stepSnapshotId)\n' +
            '- ❌ 존재하지 않는 stepSnapshotId (404 반환)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '협의 완료 성공', type: dtos_1.ApprovalStepResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 실패' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '권한 없음' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '협의 단계를 찾을 수 없음' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee,
        dtos_1.CompleteAgreementRequestDto]),
    __metadata("design:returntype", Promise)
], ApprovalProcessController.prototype, "completeAgreement", null);
__decorate([
    (0, common_1.Post)('implementation/complete'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '시행 완료',
        description: '시행 단계를 완료 처리합니다\n\n' +
            '**순서 검증 규칙:**\n' +
            '1. 모든 협의가 완료되어야 시행 가능\n' +
            '2. 모든 결재가 완료되어야 시행 가능\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 시행 완료 (의견 포함)\n' +
            '- ❌ 필수 필드 누락 (stepSnapshotId)\n' +
            '- ❌ 존재하지 않는 stepSnapshotId (404 반환)\n' +
            '- ❌ 협의가 완료되지 않은 상태에서 시행 시도 (400 반환)\n' +
            '- ❌ 결재가 완료되지 않은 상태에서 시행 시도 (400 반환)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '시행 완료 성공', type: dtos_1.ApprovalStepResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청 (순서 위반 포함)' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 실패' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '권한 없음' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '시행 단계를 찾을 수 없음' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee,
        dtos_1.CompleteImplementationRequestDto]),
    __metadata("design:returntype", Promise)
], ApprovalProcessController.prototype, "completeImplementation", null);
__decorate([
    (0, common_1.Post)('cancel'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '결재 취소',
        description: '문서 결재를 취소합니다 (기안자만 가능)\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 기안자가 결재 취소\n' +
            '- ❌ 필수 필드 누락 (documentId, cancelReason)\n' +
            '- ❌ 기안자가 아닌 사용자가 취소 시도 (403 반환)\n' +
            '- ❌ 존재하지 않는 문서 ID (404 반환)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '결재 취소 성공' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 실패' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '권한 없음' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '문서를 찾을 수 없음' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee, dtos_1.CancelApprovalRequestDto]),
    __metadata("design:returntype", Promise)
], ApprovalProcessController.prototype, "cancelApproval", null);
__decorate([
    (0, common_1.Get)('my-pending'),
    (0, swagger_1.ApiOperation)({
        summary: '내 결재 대기 목록 (실제 처리 가능한 건만)',
        description: '나에게 할당된 결재 대기 건 중 실제 처리 가능한 건만 조회합니다\n\n' +
            '**필터링 규칙:**\n' +
            '1. 협의: 언제나 처리 가능 (순서 무관)\n' +
            '2. 결재: 협의 완료 + 이전 결재 완료된 건만\n' +
            '3. 시행: 모든 협의 + 모든 결재 완료된 건만\n' +
            '4. 참조: 처리 불필요 (목록에서 제외)\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 내 결재 대기 목록 조회\n' +
            '- ✅ 기안자는 본인의 결재 대기 목록 (빈 배열 가능)\n' +
            '- ✅ 순서가 안된 결재 건은 목록에 표시되지 않음',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '결재 대기 목록 조회 성공', type: [dtos_1.ApprovalStepResponseDto] }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 실패' }),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee]),
    __metadata("design:returntype", Promise)
], ApprovalProcessController.prototype, "getMyPendingApprovals", null);
__decorate([
    (0, common_1.Get)('document/:documentId/steps'),
    (0, swagger_1.ApiOperation)({
        summary: '문서의 결재 단계 조회',
        description: '특정 문서의 모든 결재 단계를 조회합니다\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 문서의 모든 결재 단계 조회\n' +
            '- ✅ 다른 사용자도 결재 단계 조회 가능\n' +
            '- ❌ 존재하지 않는 문서 ID (404 반환)',
    }),
    (0, swagger_1.ApiParam)({ name: 'documentId', description: '문서 ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '결재 단계 조회 성공', type: dtos_1.DocumentApprovalStatusResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '문서를 찾을 수 없음' }),
    __param(0, (0, common_1.Param)('documentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApprovalProcessController.prototype, "getApprovalSteps", null);
exports.ApprovalProcessController = ApprovalProcessController = __decorate([
    (0, swagger_1.ApiTags)('결재 프로세스'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [usecases_1.ApproveStepUsecase,
        usecases_1.RejectStepUsecase,
        usecases_1.CompleteAgreementUsecase,
        usecases_1.CompleteImplementationUsecase,
        usecases_1.CancelApprovalUsecase,
        usecases_1.GetApprovalStatusUsecase])
], ApprovalProcessController);
//# sourceMappingURL=approval-process.controller.js.map