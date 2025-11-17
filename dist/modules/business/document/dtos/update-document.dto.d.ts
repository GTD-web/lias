import { UpdateApprovalStepSnapshotItemDto } from './update-approval-step-snapshot.dto';
export declare class UpdateDocumentDto {
    title?: string;
    content?: string;
    comment?: string;
    approvalSteps?: UpdateApprovalStepSnapshotItemDto[];
}
