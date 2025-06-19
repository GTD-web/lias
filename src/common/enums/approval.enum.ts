export enum ApproverType {
    USER = 'USER',
    POSITION = 'POSITION',
    // DEPARTMENT_POSITION = 'DEPARTMENT_POSITION',
    // TITLE = 'TITLE',
}

export enum DepartmentScopeType {
    SELECTED = 'SELECTED',
    DRAFT_OWNER = 'DRAFT_OWNER',
}

export enum ApprovalStepType {
    AGREEMENT = 'AGREEMENT',
    APPROVAL = 'APPROVAL',
    // EXECUTION = 'EXECUTION',
    // REFERENCE = 'REFERENCE',
}

export enum ApprovalStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    CANCELLED = 'CANCELLED',
}

export enum ApprovalLineType {
    COMMON = 'COMMON',
    CUSTOM = 'CUSTOM',
}
