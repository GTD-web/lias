import { ApprovalProcessContext } from '../../../context/approval-process/approval-process.context';
import { DocumentContext } from '../../../context/document/document.context';
import { NotificationContext } from '../../../context/notification/notification.context';
import { ApproveStepDto, RejectStepDto, CompleteAgreementDto, CompleteImplementationDto, CancelApprovalDto, ProcessApprovalActionDto } from '../dtos';
export declare class ApprovalProcessService {
    private readonly approvalProcessContext;
    private readonly documentContext;
    private readonly notificationContext;
    private readonly logger;
    constructor(approvalProcessContext: ApprovalProcessContext, documentContext: DocumentContext, notificationContext: NotificationContext);
    approveStep(dto: ApproveStepDto, approverId: string): Promise<import("../../../domain").ApprovalStepSnapshot>;
    rejectStep(dto: RejectStepDto, rejecterId: string): Promise<import("../../../domain").ApprovalStepSnapshot>;
    completeAgreement(dto: CompleteAgreementDto, agreerId: string): Promise<import("../../../domain").ApprovalStepSnapshot>;
    completeImplementation(dto: CompleteImplementationDto, implementerId: string): Promise<import("../../../domain").ApprovalStepSnapshot>;
    markReferenceRead(dto: {
        stepSnapshotId: string;
        comment?: string;
    }, referenceUserId: string): Promise<import("../../../domain").ApprovalStepSnapshot>;
    cancelApproval(dto: CancelApprovalDto, cancelerId: string): Promise<import("../../../domain").Document>;
    getMyPendingApprovals(userId: string, type: 'SUBMITTED' | 'AGREEMENT' | 'APPROVAL', page: number, limit: number): Promise<{
        data: {
            documentId: string;
            documentNumber: string;
            title: string;
            status: import("../../../../common/enums").DocumentStatus;
            drafterId: string;
            drafterName: string;
            drafterDepartmentName: any;
            currentStep: {
                id: string;
                stepOrder: number;
                stepType: import("../../../../common/enums").ApprovalStepType;
                status: import("../../../../common/enums").ApprovalStatus;
                approverId: string;
                approverSnapshot: import("../../../domain/approval-step-snapshot/approval-step-snapshot.entity").ApproverSnapshotMetadata;
            };
            approvalSteps: {
                id: string;
                stepOrder: number;
                stepType: import("../../../../common/enums").ApprovalStepType;
                status: import("../../../../common/enums").ApprovalStatus;
                approverId: string;
                approverName: string;
                comment: string;
                approvedAt: Date;
            }[];
            submittedAt: Date;
            createdAt: Date;
        }[];
        meta: {
            currentPage: number;
            itemsPerPage: number;
            totalItems: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
    }>;
    getApprovalSteps(documentId: string): Promise<import("../../../domain").ApprovalStepSnapshot[]>;
    processApprovalAction(dto: ProcessApprovalActionDto, approverId: string): Promise<import("../../../domain").Document | import("../../../domain").ApprovalStepSnapshot>;
    private sendApproveNotification;
    private sendRejectNotification;
    private sendCompleteAgreementNotification;
    private sendCompleteImplementationNotification;
}
