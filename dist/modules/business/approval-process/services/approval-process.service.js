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
var ApprovalProcessService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalProcessService = void 0;
const common_1 = require("@nestjs/common");
const approval_process_context_1 = require("../../../context/approval-process/approval-process.context");
const document_context_1 = require("../../../context/document/document.context");
const notification_context_1 = require("../../../context/notification/notification.context");
const dtos_1 = require("../dtos");
let ApprovalProcessService = ApprovalProcessService_1 = class ApprovalProcessService {
    constructor(approvalProcessContext, documentContext, notificationContext) {
        this.approvalProcessContext = approvalProcessContext;
        this.documentContext = documentContext;
        this.notificationContext = notificationContext;
        this.logger = new common_1.Logger(ApprovalProcessService_1.name);
    }
    async approveStep(dto) {
        this.logger.log(`결재 승인 요청: ${dto.stepSnapshotId}`);
        const result = await this.approvalProcessContext.approveStep(dto);
        this.sendApproveNotification(result.documentId, result.id, result.approver.employeeNumber).catch((error) => {
            this.logger.error('결재 승인 알림 전송 실패', error);
        });
        return result;
    }
    async rejectStep(dto) {
        this.logger.log(`결재 반려 요청: ${dto.stepSnapshotId}`);
        const result = await this.approvalProcessContext.rejectStep(dto);
        this.sendRejectNotification(result.documentId, dto.comment, result.approver.employeeNumber).catch((error) => {
            this.logger.error('결재 반려 알림 전송 실패', error);
        });
        return result;
    }
    async completeAgreement(dto) {
        this.logger.log(`협의 완료 요청: ${dto.stepSnapshotId}`);
        const result = await this.approvalProcessContext.completeAgreement(dto);
        this.sendCompleteAgreementNotification(result.documentId, result.approver.employeeNumber).catch((error) => {
            this.logger.error('협의 완료 알림 전송 실패', error);
        });
        return result;
    }
    async completeImplementation(dto) {
        this.logger.log(`시행 완료 요청: ${dto.stepSnapshotId}`);
        const result = await this.approvalProcessContext.completeImplementation(dto);
        this.sendCompleteImplementationNotification(result.documentId, result.approver.employeeNumber).catch((error) => {
            this.logger.error('시행 완료 알림 전송 실패', error);
        });
        return result;
    }
    async cancelApproval(dto) {
        this.logger.log(`결재 취소 요청: ${dto.documentId}`);
        return await this.approvalProcessContext.cancelApproval(dto);
    }
    async getMyPendingApprovals(userId, type, page, limit) {
        this.logger.debug(`내 결재 대기 목록 조회: userId=${userId}, type=${type}, page=${page}, limit=${limit}`);
        return await this.approvalProcessContext.getMyPendingApprovals(userId, type, page, limit);
    }
    async getApprovalSteps(documentId) {
        this.logger.debug(`문서 결재 단계 목록 조회: ${documentId}`);
        return await this.approvalProcessContext.getApprovalSteps(documentId);
    }
    async processApprovalAction(dto) {
        this.logger.log(`통합 결재 액션 처리 요청: ${dto.type}`);
        switch (dto.type) {
            case dtos_1.ApprovalActionType.APPROVE:
                if (!dto.stepSnapshotId) {
                    throw new common_1.BadRequestException('stepSnapshotId는 필수입니다.');
                }
                return await this.approveStep({
                    stepSnapshotId: dto.stepSnapshotId,
                    approverId: dto.approverId,
                    comment: dto.comment,
                });
            case dtos_1.ApprovalActionType.REJECT:
                if (!dto.stepSnapshotId) {
                    throw new common_1.BadRequestException('stepSnapshotId는 필수입니다.');
                }
                if (!dto.comment) {
                    throw new common_1.BadRequestException('반려 시 사유(comment)는 필수입니다.');
                }
                return await this.rejectStep({
                    stepSnapshotId: dto.stepSnapshotId,
                    approverId: dto.approverId,
                    comment: dto.comment,
                });
            case dtos_1.ApprovalActionType.COMPLETE_AGREEMENT:
                if (!dto.stepSnapshotId) {
                    throw new common_1.BadRequestException('stepSnapshotId는 필수입니다.');
                }
                return await this.completeAgreement({
                    stepSnapshotId: dto.stepSnapshotId,
                    agreerId: dto.approverId,
                    comment: dto.comment,
                });
            case dtos_1.ApprovalActionType.COMPLETE_IMPLEMENTATION:
                if (!dto.stepSnapshotId) {
                    throw new common_1.BadRequestException('stepSnapshotId는 필수입니다.');
                }
                return await this.completeImplementation({
                    stepSnapshotId: dto.stepSnapshotId,
                    implementerId: dto.approverId,
                    comment: dto.comment,
                    resultData: dto.resultData,
                });
            case dtos_1.ApprovalActionType.CANCEL:
                if (!dto.documentId) {
                    throw new common_1.BadRequestException('documentId는 필수입니다.');
                }
                if (!dto.reason) {
                    throw new common_1.BadRequestException('취소 사유(reason)는 필수입니다.');
                }
                return await this.cancelApproval({
                    documentId: dto.documentId,
                    drafterId: dto.approverId,
                    reason: dto.reason,
                });
            default:
                throw new common_1.BadRequestException(`지원하지 않는 액션 타입입니다: ${dto.type}`);
        }
    }
    async sendApproveNotification(documentId, currentStepId, approverEmployeeNumber) {
        try {
            const document = await this.documentContext.getDocument(documentId);
            const allSteps = await this.approvalProcessContext.getApprovalStepsByDocumentId(documentId);
            await this.notificationContext.sendNotificationAfterApprove({
                document,
                allSteps,
                currentStepId,
                approverEmployeeNumber,
            });
        }
        catch (error) {
            this.logger.error(`결재 승인 알림 전송 중 오류 발생: ${documentId}`, error);
            throw error;
        }
    }
    async sendRejectNotification(documentId, rejectReason, rejecterEmployeeNumber) {
        try {
            const document = await this.documentContext.getDocument(documentId);
            await this.notificationContext.sendNotificationAfterReject({
                document,
                rejectReason,
                rejecterEmployeeNumber,
            });
        }
        catch (error) {
            this.logger.error(`결재 반려 알림 전송 중 오류 발생: ${documentId}`, error);
            throw error;
        }
    }
    async sendCompleteAgreementNotification(documentId, agreerEmployeeNumber) {
        try {
            const document = await this.documentContext.getDocument(documentId);
            const allSteps = await this.approvalProcessContext.getApprovalStepsByDocumentId(documentId);
            await this.notificationContext.sendNotificationAfterCompleteAgreement({
                document,
                allSteps,
                agreerEmployeeNumber,
            });
        }
        catch (error) {
            this.logger.error(`협의 완료 알림 전송 중 오류 발생: ${documentId}`, error);
            throw error;
        }
    }
    async sendCompleteImplementationNotification(documentId, implementerEmployeeNumber) {
        try {
            const document = await this.documentContext.getDocument(documentId);
            const allSteps = await this.approvalProcessContext.getApprovalStepsByDocumentId(documentId);
            await this.notificationContext.sendNotificationAfterCompleteImplementation({
                document,
                allSteps,
                implementerEmployeeNumber,
            });
        }
        catch (error) {
            this.logger.error(`시행 완료 알림 전송 중 오류 발생: ${documentId}`, error);
            throw error;
        }
    }
};
exports.ApprovalProcessService = ApprovalProcessService;
exports.ApprovalProcessService = ApprovalProcessService = ApprovalProcessService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [approval_process_context_1.ApprovalProcessContext,
        document_context_1.DocumentContext,
        notification_context_1.NotificationContext])
], ApprovalProcessService);
//# sourceMappingURL=approval-process.service.js.map