import { ApprovalStepSnapshotItemDto } from './approval-step-snapshot.dto';
export declare class SubmitDocumentDto {
    documentId: string;
    documentTemplateId?: string;
    approvalSteps?: ApprovalStepSnapshotItemDto[];
}
