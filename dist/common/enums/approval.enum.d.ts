export declare enum ApproverType {
    USER = "USER",
    POSITION = "POSITION"
}
export declare enum DepartmentScopeType {
    ALL = "ALL",
    SPECIFIC_DEPARTMENT = "SPECIFIC_DEPARTMENT"
}
export declare enum ApprovalStepType {
    AGREEMENT = "AGREEMENT",
    APPROVAL = "APPROVAL",
    IMPLEMENTATION = "IMPLEMENTATION",
    REFERENCE = "REFERENCE"
}
export declare enum ApprovalStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    CANCELLED = "CANCELLED"
}
export declare enum ApprovalLineType {
    COMMON = "COMMON",
    CUSTOM = "CUSTOM"
}
export declare enum AutoFillType {
    NONE = "NONE",
    DRAFTER_ONLY = "DRAFTER_ONLY",
    DRAFTER_SUPERIOR = "DRAFTER_SUPERIOR",
    APPROVAL_LINE = "APPROVAL_LINE"
}
export declare enum DocumentListType {
    DRAFTED = "drafted",
    PENDING_APPROVAL = "pending_approval",
    PENDING_AGREEMENT = "pending_agreement",
    APPROVED = "approved",
    REJECTED = "rejected",
    RECEIVED_REFERENCE = "received_reference",
    IMPLEMENTATION = "implementation",
    ASSIGNED = "assigned"
}
export declare enum DocumentTemplateStatus {
    DRAFT = "DRAFT",
    ACTIVE = "ACTIVE",
    ARCHIVED = "ARCHIVED"
}
export declare enum ApprovalLineTemplateStatus {
    DRAFT = "DRAFT",
    ACTIVE = "ACTIVE",
    ARCHIVED = "ARCHIVED"
}
export declare enum AssigneeRule {
    FIXED = "FIXED",
    DRAFTER = "DRAFTER",
    HIERARCHY_TO_SUPERIOR = "HIERARCHY_TO_SUPERIOR",
    HIERARCHY_TO_POSITION = "HIERARCHY_TO_POSITION",
    DEPARTMENT_REFERENCE = "DEPARTMENT_REFERENCE"
}
export declare enum DocumentStatus {
    DRAFT = "DRAFT",
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    CANCELLED = "CANCELLED",
    IMPLEMENTED = "IMPLEMENTED"
}
