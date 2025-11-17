import { ApprovalStepType, ApprovalStatus } from '../../../../common/enums/approval.enum';
export declare class ApproveStepDto {
    stepSnapshotId: string;
    approverId: string;
    comment?: string;
}
export declare class RejectStepDto {
    stepSnapshotId: string;
    approverId: string;
    comment: string;
}
export declare class CompleteAgreementDto {
    stepSnapshotId: string;
    agreerId: string;
    comment?: string;
}
export declare class CompleteImplementationDto {
    stepSnapshotId: string;
    implementerId: string;
    comment?: string;
    resultData?: Record<string, any>;
}
export declare class CancelApprovalDto {
    documentId: string;
    requesterId: string;
    reason: string;
}
export declare class ApprovalStepFilterDto {
    documentId?: string;
    approverId?: string;
    status?: ApprovalStatus;
    stepType?: ApprovalStepType;
}
