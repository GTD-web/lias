import { ApprovalStepSnapshotItemDto } from './approval-step-snapshot.dto';
export declare class SubmitDocumentDirectDto {
    documentTemplateId?: string;
    title: string;
    content: string;
    metadata?: Record<string, any>;
    approvalSteps?: ApprovalStepSnapshotItemDto[];
}
