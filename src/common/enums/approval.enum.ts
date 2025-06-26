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
    IMPLEMENTATION = 'IMPLEMENTATION',
    REFERENCE = 'REFERENCE',
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

export enum AutoFillType {
    NONE = 'NONE',
    DRAFTER_ONLY = 'DRAFTER_ONLY',
    DRAFTER_SUPERIOR = 'DRAFTER_SUPERIOR',
}
