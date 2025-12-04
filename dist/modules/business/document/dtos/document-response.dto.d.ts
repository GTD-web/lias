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
export declare class DepartmentSimpleDto {
    id: string;
    departmentName: string;
    departmentCode: string;
}
export declare class PositionSimpleDto {
    id: string;
    positionTitle: string;
    positionCode: string;
    level: number;
}
export declare class RankSimpleDto {
    id: string;
    rankTitle: string;
    rankCode: string;
}
export declare class DrafterSimpleDto {
    id: string;
    employeeNumber: string;
    name: string;
    email: string;
    department?: DepartmentSimpleDto;
    position?: PositionSimpleDto;
    rank?: RankSimpleDto;
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
    drafter?: DrafterSimpleDto;
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
    canCancelApproval?: boolean;
    canCancelSubmit?: boolean;
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
