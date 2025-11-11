import { ApprovalStepSnapshotItemDto } from './approval-step-snapshot.dto';
export declare class CreateDocumentDto {
    documentTemplateId?: string;
    title: string;
    content: string;
    drafterId: string;
    metadata?: Record<string, any>;
    approvalSteps?: ApprovalStepSnapshotItemDto[];
}
