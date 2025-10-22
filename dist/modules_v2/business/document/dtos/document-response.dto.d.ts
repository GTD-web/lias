import { DocumentStatus } from '../../../../common/enums/approval.enum';
export declare class DocumentResponseDto {
    id: string;
    formId: string;
    formVersionId: string;
    title: string;
    drafterId: string;
    drafterDepartmentId?: string;
    status: DocumentStatus;
    content?: string;
    metadata?: Record<string, any>;
    documentNumber?: string;
    approvalLineSnapshotId?: string;
    submittedAt?: Date;
    cancelReason?: string;
    cancelledAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
