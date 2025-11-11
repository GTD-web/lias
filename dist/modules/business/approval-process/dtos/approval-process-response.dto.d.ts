import { ApprovalStatus, ApprovalStepType, DocumentStatus } from '../../../../common/enums/approval.enum';
import { ApprovalStepSnapshotResponseDto, ApproverSnapshotMetadataDto } from '../../document/dtos/document-response.dto';
export declare class ApprovalActionResponseDto {
    id: string;
    documentId: string;
    stepOrder: number;
    stepType: ApprovalStepType;
    approverId: string;
    status: ApprovalStatus;
    comment?: string;
    approvedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare class PendingApprovalItemDto {
    stepSnapshotId: string;
    documentId: string;
    documentNumber: string;
    documentTitle: string;
    drafterId: string;
    drafterName: string;
    stepOrder: number;
    stepType: ApprovalStepType;
    status: ApprovalStatus;
    submittedAt: Date;
    createdAt: Date;
}
export declare class DocumentApprovalStepsResponseDto {
    documentId: string;
    documentStatus: DocumentStatus;
    steps: ApprovalStepSnapshotResponseDto[];
}
export declare class CancelApprovalResponseDto {
    id: string;
    status: DocumentStatus;
    cancelReason: string;
    cancelledAt: Date;
}
export declare class CompleteImplementationResponseDto extends ApprovalActionResponseDto {
    resultData?: Record<string, any>;
}
export declare class PaginationMetaDto {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
export declare class CurrentStepInfoDto {
    id: string;
    stepOrder: number;
    stepType: ApprovalStepType;
    status: ApprovalStatus;
    approverId: string;
    approverSnapshot?: ApproverSnapshotMetadataDto;
}
export declare class ApprovalStepSummaryDto {
    id: string;
    stepOrder: number;
    stepType: ApprovalStepType;
    status: ApprovalStatus;
    approverId: string;
    approverName: string;
    comment?: string;
    approvedAt?: Date;
}
export declare class MyPendingDocumentItemDto {
    documentId: string;
    documentNumber?: string;
    title: string;
    status: DocumentStatus;
    drafterId: string;
    drafterName: string;
    drafterDepartmentName?: string;
    currentStep?: CurrentStepInfoDto;
    approvalSteps: ApprovalStepSummaryDto[];
    submittedAt?: Date;
    createdAt: Date;
}
export declare class PaginatedPendingApprovalsResponseDto {
    data: MyPendingDocumentItemDto[];
    meta: PaginationMetaDto;
}
