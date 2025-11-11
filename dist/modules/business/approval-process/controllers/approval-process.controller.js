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
const approval_process_service_1 = require("../services/approval-process.service");
const dtos_1 = require("../dtos");
let ApprovalProcessController = class ApprovalProcessController {
    constructor(approvalProcessService) {
        this.approvalProcessService = approvalProcessService;
    }
    async approveStep(dto) {
        return await this.approvalProcessService.approveStep(dto);
    }
    async rejectStep(dto) {
        return await this.approvalProcessService.rejectStep(dto);
    }
    async completeAgreement(dto) {
        return await this.approvalProcessService.completeAgreement(dto);
    }
    async completeImplementation(dto) {
        return await this.approvalProcessService.completeImplementation(dto);
    }
    async cancelApproval(dto) {
        return await this.approvalProcessService.cancelApproval(dto);
    }
    async getMyPendingApprovals(query) {
        return await this.approvalProcessService.getMyPendingApprovals(query.userId, query.type, query.page || 1, query.limit || 20);
    }
    async getApprovalSteps(documentId) {
        return await this.approvalProcessService.getApprovalSteps(documentId);
    }
    async processApprovalAction(dto) {
        return await this.approvalProcessService.processApprovalAction(dto);
    }
};
exports.ApprovalProcessController = ApprovalProcessController;
__decorate([
    (0, common_1.Post)('approve'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '결재 승인',
        description: '결재 단계를 승인합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 결재 승인\n' +
            '- ❌ 실패: 필수 필드 누락 (stepSnapshotId)\n' +
            '- ❌ 실패: 존재하지 않는 stepSnapshotId',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '결재 승인 성공', type: dtos_1.ApprovalActionResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청 (대기 중인 결재만 승인 가능, 순서 검증 실패 등)' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '권한 없음' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '결재 단계를 찾을 수 없음' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.ApproveStepDto]),
    __metadata("design:returntype", Promise)
], ApprovalProcessController.prototype, "approveStep", null);
__decorate([
    (0, common_1.Post)('reject'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '결재 반려',
        description: '결재 단계를 반려합니다. 반려 사유는 필수입니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 결재 반려 (사유 포함)\n' +
            '- ❌ 실패: 필수 필드 누락 (comment)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '결재 반려 성공', type: dtos_1.ApprovalActionResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청 (대기 중인 결재만 반려 가능, 반려 사유 누락 등)' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '권한 없음' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '결재 단계를 찾을 수 없음' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.RejectStepDto]),
    __metadata("design:returntype", Promise)
], ApprovalProcessController.prototype, "rejectStep", null);
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
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CompleteAgreementDto]),
    __metadata("design:returntype", Promise)
], ApprovalProcessController.prototype, "completeAgreement", null);
__decorate([
    (0, common_1.Post)('complete-implementation'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '시행 완료',
        description: '시행 단계를 완료 처리합니다. 모든 결재가 완료되어야 시행 가능합니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 시행 완료',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '시행 완료 성공', type: dtos_1.ApprovalActionResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청 (대기 중인 시행만 완료 가능, 모든 결재 미완료 등)' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '권한 없음' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '시행 단계를 찾을 수 없음' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CompleteImplementationDto]),
    __metadata("design:returntype", Promise)
], ApprovalProcessController.prototype, "completeImplementation", null);
__decorate([
    (0, common_1.Post)('cancel'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '결재 취소',
        description: '기안자가 결재 진행 중인 문서를 취소합니다. 기안자만 취소할 수 있습니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 결재 취소\n' +
            '- ❌ 실패: 필수 필드 누락 (reason)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '결재 취소 성공', type: dtos_1.CancelApprovalResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청 (결재 진행 중인 문서만 취소 가능)' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '권한 없음 (기안자만 취소 가능)' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '문서를 찾을 수 없음' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CancelApprovalDto]),
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
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.QueryMyPendingDto]),
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
        description: '승인, 반려, 협의 완료, 시행 완료, 취소를 하나의 API로 처리합니다. type 값에 따라 적절한 액션이 수행됩니다.\n\n' +
            '**테스트 시나리오:**\n' +
            '- ✅ 정상: 승인 액션 처리\n' +
            '- ✅ 정상: 반려 액션 처리\n' +
            '- ✅ 정상: 취소 액션 처리\n' +
            '- ❌ 실패: 잘못된 액션 타입\n' +
            '- ❌ 실패: 필수 필드 누락 (stepSnapshotId for approve)\n' +
            '- ❌ 실패: 필수 필드 누락 (comment for reject)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '액션 처리 성공', type: dtos_1.ApprovalActionResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청 (필수 필드 누락, 잘못된 타입 등)' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '권한 없음' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '결재 단계 또는 문서를 찾을 수 없음' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.ProcessApprovalActionDto]),
    __metadata("design:returntype", Promise)
], ApprovalProcessController.prototype, "processApprovalAction", null);
exports.ApprovalProcessController = ApprovalProcessController = __decorate([
    (0, swagger_1.ApiTags)('결재 프로세스'),
    (0, common_1.Controller)('approval-process'),
    __metadata("design:paramtypes", [approval_process_service_1.ApprovalProcessService])
], ApprovalProcessController);
//# sourceMappingURL=approval-process.controller.js.map