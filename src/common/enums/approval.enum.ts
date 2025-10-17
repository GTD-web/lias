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
    APPROVAL_LINE = 'APPROVAL_LINE',
}

export enum DocumentListType {
    DRAFTED = 'drafted', // 내가 상신한 문서
    PENDING_APPROVAL = 'pending_approval', // 결재 진행중 문서 (현재 차례)
    PENDING_AGREEMENT = 'pending_agreement', // 협의 진행중 문서 (현재 차례)
    APPROVED = 'approved', // 결재 완료된 문서
    REJECTED = 'rejected', // 결재 반려된 문서
    RECEIVED_REFERENCE = 'received_reference', // 내가 수신한 문서 (참조)
    IMPLEMENTATION = 'implementation', // 내가 시행해야하는 문서 (현재 차례)
    ASSIGNED = 'assigned', // 내가 할당받은 문서
}
