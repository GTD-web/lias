export declare enum ApprovalActionType {
    APPROVE = "approve",
    REJECT = "reject",
    COMPLETE_AGREEMENT = "complete-agreement",
    COMPLETE_IMPLEMENTATION = "complete-implementation",
    CANCEL = "cancel"
}
export declare class ProcessApprovalActionDto {
    type: ApprovalActionType;
    stepSnapshotId?: string;
    documentId?: string;
    comment?: string;
    reason?: string;
    resultData?: Record<string, any>;
}
