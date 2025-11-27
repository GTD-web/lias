import { DocumentStatus, ApprovalStepType, ApprovalStatus } from '../../../../common/enums/approval.enum';
export declare class ApproverSnapshotMetadataDto {
    departmentId?: string;
    departmentName?: string;
    positionId?: string;
    positionTitle?: string;
    rankId?: string;
    rankTitle?: string;
    employeeName?: string;
    employeeNumber?: string;
}
export declare class ApprovalStepSnapshotResponseDto {
    id: string;
    documentId: string;
    stepOrder: number;
    stepType: ApprovalStepType;
    approverId: string;
    approverSnapshot?: ApproverSnapshotMetadataDto;
    status: ApprovalStatus;
    comment?: string;
    approvedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
declare class CategorySimpleDto {
    id: string;
    name: string;
    code: string;
    description?: string;
    order: number;
}
export declare class DocumentTemplateSimpleResponseDto {
    id: string;
    name: string;
    code: string;
    category?: CategorySimpleDto;
}
export declare class DocumentResponseDto {
    id: string;
    documentNumber?: string;
    title: string;
    content: string;
    status: DocumentStatus;
    comment?: string;
    metadata?: Record<string, any>;
    drafterId: string;
    documentTemplateId?: string;
    documentTemplate?: DocumentTemplateSimpleResponseDto;
    retentionPeriod?: string;
    retentionPeriodUnit?: string;
    retentionStartDate?: Date;
    retentionEndDate?: Date;
    submittedAt?: Date;
    cancelReason?: string;
    cancelledAt?: Date;
    approvedAt?: Date;
    rejectedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    approvalSteps?: ApprovalStepSnapshotResponseDto[];
}
export declare class SubmitDocumentResponseDto {
    document: DocumentResponseDto;
    approvalSteps: ApprovalStepSnapshotResponseDto[];
}
export declare class PaginationMetaDto {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
export declare class PaginatedDocumentsResponseDto {
    data: DocumentResponseDto[];
    meta: PaginationMetaDto;
}
export {};
