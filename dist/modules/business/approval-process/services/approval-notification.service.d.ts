import { NotificationContext } from '../../../context/notification/notification.context';
import { ApprovalProcessContext } from '../../../context/approval-process/approval-process.context';
import { DocumentContext } from '../../../context/document/document.context';
export declare class ApprovalNotificationService {
    private readonly notificationContext;
    private readonly approvalProcessContext;
    private readonly documentContext;
    private readonly logger;
    constructor(notificationContext: NotificationContext, approvalProcessContext: ApprovalProcessContext, documentContext: DocumentContext);
    sendNotificationAfterSubmit(documentId: string, drafterEmployeeNumber: string): Promise<void>;
    sendNotificationAfterCompleteAgreement(documentId: string, agreerEmployeeNumber: string): Promise<void>;
    sendNotificationAfterApprove(documentId: string, currentStepId: string, approverEmployeeNumber: string): Promise<void>;
    sendNotificationAfterReject(documentId: string, rejectReason: string, rejecterEmployeeNumber: string): Promise<void>;
    sendNotificationAfterCompleteImplementation(documentId: string, implementerEmployeeNumber: string): Promise<void>;
    private sendAgreementNotifications;
    private sendApprovalNotification;
    private sendApprovalCompletionToDrafter;
    private sendRejectionToDrafter;
    private sendImplementationNotifications;
    private sendImplementationCompletionToDrafter;
    private sendReferenceNotifications;
    private findNextPendingStep;
    private sendNotificationToApprover;
    private sendNotificationToApprovers;
    private sendNotificationToReferences;
    private sendNotificationToDrafter;
    private getDrafterNotificationMessage;
    private getStepTypeText;
}
