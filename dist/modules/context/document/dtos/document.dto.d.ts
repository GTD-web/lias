import { DocumentStatus, ApprovalStepType } from '../../../../common/enums/approval.enum';
export declare class ApprovalStepSnapshotItemDto {
    stepOrder: number;
    stepType: ApprovalStepType;
    approverId: string;
    id?: string;
}
export declare class CreateDocumentDto {
    documentTemplateId?: string;
    title: string;
    content: string;
    drafterId: string;
    metadata?: Record<string, any>;
    approvalSteps?: ApprovalStepSnapshotItemDto[];
}
export declare class UpdateDocumentDto {
    title?: string;
    content?: string;
    metadata?: Record<string, any>;
    status?: DocumentStatus;
    approvalSteps?: ApprovalStepSnapshotItemDto[];
}
export declare class SubmitDocumentDto {
    documentId: string;
    documentTemplateId?: string;
    approvalSteps?: ApprovalStepSnapshotItemDto[];
}
export declare class DocumentFilterDto {
    status?: DocumentStatus;
    drafterId?: string;
    documentTemplateId?: string;
    startDate?: Date;
    endDate?: Date;
    searchKeyword?: string;
}
