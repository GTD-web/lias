export declare enum MyAllDocumentFilterType {
    DRAFT = "DRAFT",
    PENDING = "PENDING",
    PENDING_AGREEMENT = "PENDING_AGREEMENT",
    PENDING_APPROVAL = "PENDING_APPROVAL",
    IMPLEMENTATION = "IMPLEMENTATION",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    RECEIVED_REFERENCE = "RECEIVED_REFERENCE"
}
export declare enum ApprovalFilterStatus {
    SCHEDULED = "SCHEDULED",
    CURRENT = "CURRENT",
    COMPLETED = "COMPLETED"
}
export declare enum ReferenceReadStatus {
    READ = "READ",
    UNREAD = "UNREAD"
}
export declare class QueryMyAllDocumentsDto {
    userId?: string;
    filterType?: MyAllDocumentFilterType;
    approvalStatus?: ApprovalFilterStatus;
    referenceReadStatus?: ReferenceReadStatus;
    searchKeyword?: string;
    categoryId?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
}
