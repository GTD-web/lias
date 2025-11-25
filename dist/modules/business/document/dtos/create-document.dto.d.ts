import { ApprovalStepSnapshotItemDto } from './approval-step-snapshot.dto';
export declare class CreateDocumentDto {
    documentTemplateId?: string;
    title: string;
    content: string;
    metadata?: Record<string, any>;
    approvalSteps?: ApprovalStepSnapshotItemDto[];
}
