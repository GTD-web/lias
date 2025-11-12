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
var ApprovalNotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalNotificationService = void 0;
const common_1 = require("@nestjs/common");
const notification_context_1 = require("../../../context/notification/notification.context");
const approval_process_context_1 = require("../../../context/approval-process/approval-process.context");
const document_context_1 = require("../../../context/document/document.context");
const approval_enum_1 = require("../../../../common/enums/approval.enum");
let ApprovalNotificationService = ApprovalNotificationService_1 = class ApprovalNotificationService {
    constructor(notificationContext, approvalProcessContext, documentContext) {
        this.notificationContext = notificationContext;
        this.approvalProcessContext = approvalProcessContext;
        this.documentContext = documentContext;
        this.logger = new common_1.Logger(ApprovalNotificationService_1.name);
    }
    async sendNotificationAfterSubmit(documentId, drafterEmployeeNumber) {
        this.logger.log(`문서 기안 후 알림 전송: ${documentId}`);
        try {
            const document = await this.documentContext.getDocument(documentId);
            const allSteps = await this.approvalProcessContext.getApprovalStepsByDocumentId(documentId);
            const agreementSteps = allSteps.filter((s) => s.stepType === approval_enum_1.ApprovalStepType.AGREEMENT);
            if (agreementSteps.length > 0) {
                await this.sendAgreementNotifications(agreementSteps, document, drafterEmployeeNumber);
            }
            else {
                const approvalSteps = allSteps.filter((s) => s.stepType === approval_enum_1.ApprovalStepType.APPROVAL);
                const firstApprovalStep = approvalSteps.find((s) => s.status === approval_enum_1.ApprovalStatus.PENDING);
                if (firstApprovalStep && firstApprovalStep.approverId !== document.drafterId) {
                    await this.sendApprovalNotification(firstApprovalStep, document, drafterEmployeeNumber);
                }
                else if (!firstApprovalStep) {
                    const implementationSteps = allSteps.filter((s) => s.stepType === approval_enum_1.ApprovalStepType.IMPLEMENTATION && s.status === approval_enum_1.ApprovalStatus.PENDING);
                    if (implementationSteps.length > 0) {
                        await this.sendImplementationNotifications(implementationSteps, document, drafterEmployeeNumber);
                    }
                }
            }
        }
        catch (error) {
            this.logger.error(`문서 기안 후 알림 전송 실패: ${documentId}`, error);
            throw error;
        }
    }
    async sendNotificationAfterCompleteAgreement(documentId, agreerEmployeeNumber) {
        this.logger.log(`협의 완료 후 알림 전송: ${documentId}`);
        try {
            const document = await this.documentContext.getDocument(documentId);
            const allSteps = await this.approvalProcessContext.getApprovalStepsByDocumentId(documentId);
            const agreementSteps = allSteps.filter((s) => s.stepType === approval_enum_1.ApprovalStepType.AGREEMENT);
            const allAgreementsCompleted = agreementSteps.every((s) => s.status === approval_enum_1.ApprovalStatus.APPROVED);
            if (!allAgreementsCompleted) {
                this.logger.debug('아직 완료되지 않은 협의가 있습니다.');
                return;
            }
            const approvalSteps = allSteps.filter((s) => s.stepType === approval_enum_1.ApprovalStepType.APPROVAL);
            const firstApprovalStep = approvalSteps.find((s) => s.status === approval_enum_1.ApprovalStatus.PENDING);
            if (firstApprovalStep) {
                await this.sendApprovalNotification(firstApprovalStep, document, agreerEmployeeNumber);
            }
        }
        catch (error) {
            this.logger.error(`협의 완료 후 알림 전송 실패: ${documentId}`, error);
            throw error;
        }
    }
    async sendNotificationAfterApprove(documentId, currentStepId, approverEmployeeNumber) {
        this.logger.log(`결재 승인 후 알림 전송: ${documentId}`);
        try {
            const document = await this.documentContext.getDocument(documentId);
            const allSteps = await this.approvalProcessContext.getApprovalStepsByDocumentId(documentId);
            const currentStep = allSteps.find((step) => step.id === currentStepId);
            if (!currentStep) {
                this.logger.warn(`현재 단계를 찾을 수 없습니다: ${currentStepId}`);
                return;
            }
            const nextPendingStep = this.findNextPendingStep(allSteps, currentStep.stepOrder);
            if (nextPendingStep) {
                if (nextPendingStep.stepType === approval_enum_1.ApprovalStepType.APPROVAL) {
                    await this.sendApprovalNotification(nextPendingStep, document, approverEmployeeNumber);
                }
                else if (nextPendingStep.stepType === approval_enum_1.ApprovalStepType.IMPLEMENTATION) {
                    const implementationSteps = allSteps.filter((s) => s.stepType === approval_enum_1.ApprovalStepType.IMPLEMENTATION && s.status === approval_enum_1.ApprovalStatus.PENDING);
                    await this.sendImplementationNotifications(implementationSteps, document, approverEmployeeNumber);
                }
            }
            else {
                await this.sendReferenceNotifications(document, approverEmployeeNumber);
                await this.sendApprovalCompletionToDrafter(document, approverEmployeeNumber);
            }
        }
        catch (error) {
            this.logger.error(`결재 승인 후 알림 전송 실패: ${documentId}`, error);
            throw error;
        }
    }
    async sendNotificationAfterReject(documentId, rejectReason, rejecterEmployeeNumber) {
        this.logger.log(`결재 반려 후 알림 전송: ${documentId}`);
        try {
            const document = await this.documentContext.getDocument(documentId);
            await this.sendRejectionToDrafter(document, rejectReason, rejecterEmployeeNumber);
        }
        catch (error) {
            this.logger.error(`결재 반려 후 알림 전송 실패: ${documentId}`, error);
            throw error;
        }
    }
    async sendNotificationAfterCompleteImplementation(documentId, implementerEmployeeNumber) {
        this.logger.log(`시행 완료 후 알림 전송: ${documentId}`);
        try {
            const document = await this.documentContext.getDocument(documentId);
            await this.sendReferenceNotifications(document, implementerEmployeeNumber);
            await this.sendImplementationCompletionToDrafter(document, implementerEmployeeNumber);
            this.logger.log(`시행 완료 알림 전송 완료`);
        }
        catch (error) {
            this.logger.error(`시행 완료 후 알림 전송 실패: ${documentId}`, error);
            throw error;
        }
    }
    async sendAgreementNotifications(agreementSteps, document, senderEmployeeNumber) {
        await this.sendNotificationToApprovers(agreementSteps, document, senderEmployeeNumber);
    }
    async sendApprovalNotification(approvalStep, document, senderEmployeeNumber) {
        await this.sendNotificationToApprover(approvalStep, document, senderEmployeeNumber);
    }
    async sendApprovalCompletionToDrafter(document, senderEmployeeNumber) {
        await this.sendNotificationToDrafter(document, approval_enum_1.DocumentStatus.APPROVED, senderEmployeeNumber);
    }
    async sendRejectionToDrafter(document, rejectReason, senderEmployeeNumber) {
        await this.sendNotificationToDrafter(document, approval_enum_1.DocumentStatus.REJECTED, senderEmployeeNumber, {
            reason: rejectReason,
        });
    }
    async sendImplementationNotifications(implementationSteps, document, senderEmployeeNumber) {
        if (implementationSteps.length === 1) {
            await this.sendNotificationToApprover(implementationSteps[0], document, senderEmployeeNumber);
        }
        else if (implementationSteps.length > 1) {
            await this.sendNotificationToApprovers(implementationSteps, document, senderEmployeeNumber);
        }
    }
    async sendImplementationCompletionToDrafter(document, senderEmployeeNumber) {
        await this.sendNotificationToDrafter(document, approval_enum_1.DocumentStatus.IMPLEMENTED, senderEmployeeNumber);
    }
    async sendReferenceNotifications(document, senderEmployeeNumber) {
        await this.sendNotificationToReferences(document, senderEmployeeNumber);
    }
    findNextPendingStep(allSteps, currentStepOrder) {
        const agreementSteps = allSteps.filter((s) => s.stepType === approval_enum_1.ApprovalStepType.AGREEMENT);
        const allAgreementsCompleted = agreementSteps.every((s) => s.status === approval_enum_1.ApprovalStatus.APPROVED);
        const approvalSteps = allSteps.filter((s) => s.stepType === approval_enum_1.ApprovalStepType.APPROVAL);
        const allApprovalsCompleted = approvalSteps.every((s) => s.status === approval_enum_1.ApprovalStatus.APPROVED);
        if (!allApprovalsCompleted) {
            const nextApprovalStep = approvalSteps.find((step) => step.stepOrder > currentStepOrder && step.status === approval_enum_1.ApprovalStatus.PENDING);
            if (nextApprovalStep && allAgreementsCompleted) {
                return nextApprovalStep;
            }
        }
        if (allApprovalsCompleted) {
            const implementationStep = allSteps.find((step) => step.stepType === approval_enum_1.ApprovalStepType.IMPLEMENTATION && step.status === approval_enum_1.ApprovalStatus.PENDING);
            return implementationStep || null;
        }
        return null;
    }
    async sendNotificationToApprover(step, document, senderEmployeeNumber) {
        const stepTypeText = this.getStepTypeText(step.stepType);
        await this.notificationContext.sendNotificationToEmployee({
            sender: senderEmployeeNumber,
            title: `[${stepTypeText}] ${document.title}`,
            content: `${document.drafter.name}님이 작성한 문서가 ${stepTypeText} 대기 중입니다.`,
            recipientEmployeeId: step.approverId,
            linkUrl: `/approval/document/${document.id}`,
            metadata: {
                documentId: document.id,
                stepId: step.id,
                stepType: step.stepType,
            },
        });
        this.logger.log(`${stepTypeText} 알림 전송 완료: ${step.approverId}`);
    }
    async sendNotificationToApprovers(steps, document, senderEmployeeNumber) {
        if (steps.length === 0) {
            this.logger.debug('알림을 보낼 승인자가 없습니다.');
            return;
        }
        const stepType = steps[0].stepType;
        const stepTypeText = this.getStepTypeText(stepType);
        const approverIds = steps.map((step) => step.approverId);
        await this.notificationContext.sendNotification({
            sender: senderEmployeeNumber,
            title: `[${stepTypeText}] ${document.title}`,
            content: `${document.drafter.name}님이 작성한 문서가 ${stepTypeText} 대기 중입니다.`,
            recipientEmployeeIds: approverIds,
            linkUrl: `/approval/document/${document.id}`,
            metadata: {
                documentId: document.id,
                stepType: stepType,
                stepIds: steps.map((step) => step.id),
            },
        });
        this.logger.log(`${stepTypeText} 알림 전송 완료: ${approverIds.length}명`);
    }
    async sendNotificationToReferences(document, senderEmployeeNumber) {
        const allSteps = await this.approvalProcessContext.getApprovalStepsByDocumentId(document.id);
        const referenceSteps = allSteps.filter((step) => step.stepType === approval_enum_1.ApprovalStepType.REFERENCE);
        if (referenceSteps.length === 0) {
            this.logger.debug('참조자가 없습니다.');
            return;
        }
        const referenceIds = referenceSteps.map((step) => step.approverId);
        await this.notificationContext.sendNotification({
            sender: senderEmployeeNumber,
            title: `[참조] ${document.title}`,
            content: `${document.drafter.name}님의 문서가 최종 승인 완료되었습니다.`,
            recipientEmployeeIds: referenceIds,
            linkUrl: `/approval/document/${document.id}`,
            metadata: {
                documentId: document.id,
                status: document.status,
            },
        });
        this.logger.log(`참조자 알림 전송 완료: ${referenceIds.length}명`);
    }
    async sendNotificationToDrafter(document, documentStatus, senderEmployeeNumber, additionalInfo) {
        const { title, content } = this.getDrafterNotificationMessage(documentStatus, document.title, additionalInfo);
        await this.notificationContext.sendNotificationToEmployee({
            sender: senderEmployeeNumber,
            title,
            content,
            recipientEmployeeId: document.drafterId,
            linkUrl: `/approval/document/${document.id}`,
            metadata: {
                documentId: document.id,
                status: documentStatus,
                ...additionalInfo,
            },
        });
        this.logger.log(`기안자 알림 전송 완료 (${documentStatus}): ${document.drafterId}`);
    }
    getDrafterNotificationMessage(status, documentTitle, additionalInfo) {
        switch (status) {
            case approval_enum_1.DocumentStatus.REJECTED:
                return {
                    title: `[반려] ${documentTitle}`,
                    content: `작성하신 문서가 반려되었습니다.\n사유: ${additionalInfo?.reason || '사유 없음'}`,
                };
            case approval_enum_1.DocumentStatus.APPROVED:
                return {
                    title: `[완료] ${documentTitle}`,
                    content: `작성하신 문서의 결재가 완료되었습니다.`,
                };
            case approval_enum_1.DocumentStatus.IMPLEMENTED:
                return {
                    title: `[시행완료] ${documentTitle}`,
                    content: `작성하신 문서의 시행이 완료되었습니다.`,
                };
            case approval_enum_1.DocumentStatus.CANCELLED:
                return {
                    title: `[취소] ${documentTitle}`,
                    content: `문서가 취소되었습니다.`,
                };
            default:
                return {
                    title: `[알림] ${documentTitle}`,
                    content: `문서 상태가 변경되었습니다.`,
                };
        }
    }
    getStepTypeText(stepType) {
        switch (stepType) {
            case approval_enum_1.ApprovalStepType.AGREEMENT:
                return '협의';
            case approval_enum_1.ApprovalStepType.APPROVAL:
                return '결재';
            case approval_enum_1.ApprovalStepType.IMPLEMENTATION:
                return '시행';
            case approval_enum_1.ApprovalStepType.REFERENCE:
                return '참조';
            default:
                return '처리';
        }
    }
};
exports.ApprovalNotificationService = ApprovalNotificationService;
exports.ApprovalNotificationService = ApprovalNotificationService = ApprovalNotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notification_context_1.NotificationContext,
        approval_process_context_1.ApprovalProcessContext,
        document_context_1.DocumentContext])
], ApprovalNotificationService);
//# sourceMappingURL=approval-notification.service.js.map