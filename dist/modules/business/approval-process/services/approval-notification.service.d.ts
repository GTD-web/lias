import { NotificationContext } from '../../../context/notification/notification.context';
import { ApprovalProcessContext } from '../../../context/approval-process/approval-process.context';
import { DocumentContext } from '../../../context/document/document.context';
export declare class ApprovalNotificationService {
    private readonly notificationContext;
    private readonly approvalProcessContext;
    private readonly documentContext;
    private readonly logger;
    constructor(notificationContext: NotificationContext, approvalProcessContext: ApprovalProcessContext, documentContext: DocumentContext);
    sendNotificationAfterApprove(documentId: string, currentStepId: string, approverEmployeeNumber: string): Promise<void>;
    sendNotificationAfterReject(documentId: string, rejectReason: string, rejecterEmployeeNumber: string): Promise<void>;
    sendNotificationAfterCompleteAgreement(documentId: string, agreerEmployeeNumber: string): Promise<void>;
    sendNotificationAfterCompleteImplementation(documentId: string, implementerEmployeeNumber: string): Promise<void>;
    sendNotificationAfterSubmit(documentId: string, drafterEmployeeNumber: string): Promise<void>;
    private findNextPendingStep;
    private sendNotificationToApprover;
    private sendNotificationToReferences;
    private sendCompletionNotificationToDrafter;
    private getStepTypeText;
}
