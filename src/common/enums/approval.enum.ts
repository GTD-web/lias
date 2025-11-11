export enum ApproverType {
    USER = 'USER',
    POSITION = 'POSITION',
    // DEPARTMENT_POSITION = 'DEPARTMENT_POSITION',
    // TITLE = 'TITLE',
}

export enum DepartmentScopeType {
    ALL = 'ALL', // 전사 공통
    SPECIFIC_DEPARTMENT = 'SPECIFIC_DEPARTMENT', // 특정 부서 전용
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

export enum DocumentTemplateStatus {
    DRAFT = 'DRAFT', // 초안
    ACTIVE = 'ACTIVE', // 활성
    ARCHIVED = 'ARCHIVED', // 보관
}

export enum ApprovalLineTemplateStatus {
    DRAFT = 'DRAFT', // 초안
    ACTIVE = 'ACTIVE', // 활성
    ARCHIVED = 'ARCHIVED', // 보관
}

export enum AssigneeRule {
    // 모든 ApprovalStepType에 가능
    FIXED = 'FIXED', // 고정 결재자

    // 결재 단계 타입이 APPROVAL, IMPLEMENTATION 인 경우만 가능
    DRAFTER = 'DRAFTER', // 기안자

    // 결재 단계 타입이 APPROVAL 인 경우만 가능
    HIERARCHY_TO_SUPERIOR = 'HIERARCHY_TO_SUPERIOR', // 기안자부터 기안자의 바로 위 상급자까지
    HIERARCHY_TO_POSITION = 'HIERARCHY_TO_POSITION', // 기안자부터 특정 직책까지

    // 결재 단계 타입이 REFERENCE 인 경우만 가능
    DEPARTMENT_REFERENCE = 'DEPARTMENT_REFERENCE', // 부서 전체 참조
}

export enum DocumentStatus {
    DRAFT = 'DRAFT', // 임시저장
    PENDING = 'PENDING', // 결재 진행중
    APPROVED = 'APPROVED', // 승인 완료
    REJECTED = 'REJECTED', // 반려
    CANCELLED = 'CANCELLED', // 취소
    IMPLEMENTED = 'IMPLEMENTED', // 시행 완료
}
