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
const jwt_auth_guard_1 = require("../../../../common/guards/jwt-auth.guard");
const approval_process_service_1 = require("../services/approval-process.service");
const dtos_1 = require("../dtos");
const employee_entity_1 = require("../../../domain/employee/employee.entity");
const user_decorator_1 = require("../../../../common/decorators/user.decorator");
let ApprovalProcessController = class ApprovalProcessController {
    constructor(approvalProcessService) {
        this.approvalProcessService = approvalProcessService;
    }
    async completeAgreement(user, dto) {
        return await this.approvalProcessService.completeAgreement(dto, user.id);
    }
    async approveStep(user, dto) {
        return await this.approvalProcessService.approveStep(dto, user.id);
    }
    async completeImplementation(user, dto) {
        return await this.approvalProcessService.completeImplementation(dto, user.id);
    }
    async markReferenceRead(user, dto) {
        return await this.approvalProcessService.markReferenceRead(dto, user.id);
    }
    async rejectStep(user, dto) {
        return await this.approvalProcessService.rejectStep(dto, user.id);
    }
    async cancelApproval(user, dto) {
        return await this.approvalProcessService.cancelApproval(dto, user.id);
    }
    async getMyPendingApprovals(user, query) {
        return await this.approvalProcessService.getMyPendingApprovals(user.id, query.type, query.page || 1, query.limit || 20);
    }
    async getApprovalSteps(documentId) {
        return await this.approvalProcessService.getApprovalSteps(documentId);
    }
    async processApprovalAction(user, dto) {
        return await this.approvalProcessService.processApprovalAction(dto, user.id);
    }
};
exports.ApprovalProcessController = ApprovalProcessController;
__decorate([
    (0, common_1.Post)('complete-agreement'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '협의 완료',
        description: '협의 단계를 완료 처리합니다.\n\n' + '**테스트 시나리오:**\n' + '- ✅ 정상: 협의 완료',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '협의 완료 성공', type: dtos_1.ApprovalActionResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청 (대기 중인 협의만 완료 가능)' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '권한 없음' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '협의 단계를 찾을 수 없음' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee, dtos_1.CompleteAgreementDto]),
    __metadata("design:returntype", Promise)
], ApprovalProcessController.prototype, "completeAgreement", null);
__decorate([
    (0, common_1.Post)('approve'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '결재 승인',
        description: '결재 단계를 승인합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 결재 승인 성공\n' +
            '- ❌ 실패: 권한 없는 사용자의 승인 시도\n' +
            '- ❌ 실패: 존재하지 않는 stepSnapshotId',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '결재 승인 성공', type: dtos_1.ApprovalActionResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청 (대기 중인 결재만 승인 가능, 순서 검증 실패 등)' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '권한 없음' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '결재 단계를 찾을 수 없음' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee, dtos_1.ApproveStepDto]),
    __metadata("design:returntype", Promise)
], ApprovalProcessController.prototype, "approveStep", null);
__decorate([
    (0, common_1.Post)('complete-implementation'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '시행 완료',
        description: '시행 단계를 완료 처리합니다. 모든 결재가 완료되어야 시행 가능합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 시행 완료\n' +
            '- ❌ 실패: 결재 완료되지 않은 문서의 시행 시도',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '시행 완료 성공', type: dtos_1.ApprovalActionResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청 (대기 중인 시행만 완료 가능, 모든 결재 미완료 등)' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '권한 없음' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '시행 단계를 찾을 수 없음' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee, dtos_1.CompleteImplementationDto]),
    __metadata("design:returntype", Promise)
], ApprovalProcessController.prototype, "completeImplementation", null);
__decorate([
    (0, common_1.Post)('mark-reference-read'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '참조 문서 열람 확인',
        description: '참조 문서를 열람했음을 확인합니다. 참조자가 문서를 읽은 후 열람 완료 처리합니다.\n\n' +
            '**주요 기능:**\n' +
            '- 참조 단계를 APPROVED 상태로 변경 (열람 완료)\n' +
            '- 열람 의견 추가 가능 (선택)\n' +
            '- 이미 열람한 경우 중복 처리 허용\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 참조 문서 열람 확인\n' +
            '- ✅ 정상: 열람 의견 포함\n' +
            '- ✅ 정상: 이미 열람한 문서 재확인\n' +
            '- ❌ 실패: 참조자가 아닌 사용자의 열람 확인\n' +
            '- ❌ 실패: 참조 단계가 아닌 단계 처리',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '참조 열람 확인 성공', type: dtos_1.ApprovalActionResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청 (참조 단계만 처리 가능)' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '권한 없음 (해당 참조자만 확인 가능)' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '참조 단계를 찾을 수 없음' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee, dtos_1.MarkReferenceReadDto]),
    __metadata("design:returntype", Promise)
], ApprovalProcessController.prototype, "markReferenceRead", null);
__decorate([
    (0, common_1.Post)('reject'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '결재 반려, 합의 반려',
        description: '결재 단계를 반려합니다. 반려 사유는 필수입니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 결재 반려 (사유 포함)\n' +
            '- ❌ 실패: 반려 사유 누락',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '결재 반려 성공', type: dtos_1.ApprovalActionResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청 (대기 중인 결재만 반려 가능, 반려 사유 누락 등)' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '권한 없음' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '결재 단계를 찾을 수 없음' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee, dtos_1.RejectStepDto]),
    __metadata("design:returntype", Promise)
], ApprovalProcessController.prototype, "rejectStep", null);
__decorate([
    (0, common_1.Post)('cancel'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '결재 취소, 문서 취소 (대리취소 지원)',
        description: '결재 진행 중인 문서를 취소합니다.\n\n' +
            '**취소 가능 대상:**\n' +
            '- 기안자 상신취소: 결재자가 아직 처리하지 않은 상태에서만 가능\n' +
            '- 결재자 결재취소: 본인이 승인한 결재 단계만 취소 가능, 다음 단계가 처리되지 않은 경우에만\n' +
            '  - ⚠️ APPROVAL 타입의 결재만 취소 대상 (AGREEMENT, REFERENCE, IMPLEMENTATION 제외)\n\n' +
            '**예시:**\n' +
            '- 결재자가 아직 처리하기 전 → 기안자 상신취소 가능\n' +
            '- 1번 결재자 승인 후 → 기안자 상신취소 불가, 1번 결재자 결재취소 가능\n' +
            '- 2번 결재자까지 승인 후 → 1번 취소 불가, 2번 취소 가능\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 기안자가 결재자 처리 전 상신취소\n' +
            '- ✅ 정상: 본인이 승인한 결재 취소 (다음 결재자 대기 중)\n' +
            '- ❌ 실패: 결재자가 처리한 후 기안자 상신취소 시도\n' +
            '- ❌ 실패: 취소 사유 누락',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '결재 취소 성공', type: dtos_1.CancelApprovalResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청 (결재 진행 중인 문서만 취소 가능)' }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: '권한 없음 (기안자 또는 가장 최근에 APPROVAL 결재를 완료한 결재자만 취소 가능)',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '문서를 찾을 수 없음' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee, dtos_1.CancelApprovalDto]),
    __metadata("design:returntype", Promise)
], ApprovalProcessController.prototype, "cancelApproval", null);
__decorate([
    (0, common_1.Get)('my-pending'),
    (0, swagger_1.ApiOperation)({
        summary: '내 결재 대기 목록 조회 (탭별 필터링, 페이징)',
        description: '현재 사용자의 결재 대기 목록을 조회합니다. 탭별로 필터링 가능합니다.\n\n' +
            '**조회 타입:**\n' +
            '- **SUBMITTED** (상신): 내가 기안한 문서들 중 결재 대기 중인 문서\n' +
            '- **AGREEMENT** (합의): 내가 합의해야 하는 문서들\n' +
            '- **APPROVAL** (미결): 내가 결재해야 하는 문서들\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 상신 문서 목록 조회 (type=SUBMITTED)\n' +
            '- ✅ 정상: 합의 대기 목록 조회 (type=AGREEMENT)\n' +
            '- ✅ 정상: 결재 대기 목록 조회 (type=APPROVAL)\n' +
            '- ✅ 정상: 페이징 처리',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '조회 성공', type: dtos_1.PaginatedPendingApprovalsResponseDto }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee, dtos_1.QueryMyPendingDto]),
    __metadata("design:returntype", Promise)
], ApprovalProcessController.prototype, "getMyPendingApprovals", null);
__decorate([
    (0, common_1.Get)('document/:documentId/steps'),
    (0, swagger_1.ApiOperation)({
        summary: '문서의 결재 단계 목록 조회',
        description: '특정 문서의 모든 결재 단계 목록을 조회합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 문서의 결재 단계 목록 조회\n' +
            '- ❌ 실패: 존재하지 않는 문서 ID',
    }),
    (0, swagger_1.ApiParam)({
        name: 'documentId',
        description: '문서 ID',
        example: 'uuid',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '조회 성공', type: dtos_1.DocumentApprovalStepsResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '문서를 찾을 수 없음' }),
    __param(0, (0, common_1.Param)('documentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApprovalProcessController.prototype, "getApprovalSteps", null);
__decorate([
    (0, common_1.Post)('process-action'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '통합 결재 액션 처리',
        description: '승인, 반려, 협의 완료, 시행 완료, 참조 열람, 취소를 하나의 API로 처리합니다. type 값에 따라 적절한 액션이 수행됩니다.\n\n' +
            '**지원 액션 타입:**\n' +
            '- approve: 결재 승인\n' +
            '- reject: 결재 반려\n' +
            '- complete-agreement: 협의 완료\n' +
            '- complete-implementation: 시행 완료\n' +
            '- mark-reference-read: 참조 열람 확인\n' +
            '- cancel: 결재 취소\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 승인 액션 처리\n' +
            '- ✅ 정상: 반려 액션 처리\n' +
            '- ✅ 정상: 참조 열람 액션 처리\n' +
            '- ✅ 정상: 취소 액션 처리\n' +
            '- ❌ 실패: 잘못된 액션 타입\n' +
            '- ❌ 실패: 필수 필드 누락 (stepSnapshotId for approve)\n' +
            '- ❌ 실패: 필수 필드 누락 (comment for reject)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '액션 처리 성공', type: dtos_1.ApprovalActionResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청 (필수 필드 누락, 잘못된 타입 등)' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '권한 없음' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '결재 단계 또는 문서를 찾을 수 없음' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee, dtos_1.ProcessApprovalActionDto]),
    __metadata("design:returntype", Promise)
], ApprovalProcessController.prototype, "processApprovalAction", null);
exports.ApprovalProcessController = ApprovalProcessController = __decorate([
    (0, swagger_1.ApiTags)('결재 프로세스'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('approval-process'),
    __metadata("design:paramtypes", [approval_process_service_1.ApprovalProcessService])
], ApprovalProcessController);
//# sourceMappingURL=approval-process.controller.js.map