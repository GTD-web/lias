/**
 * Assignee Rule 정의
 * JSON 기반으로 동적 결재선 규칙을 정의
 */

export enum AssigneeRuleType {
    FIXED_USER = 'FIXED_USER', // 고정 사용자
    DIRECT_MANAGER = 'DIRECT_MANAGER', // 직속 상관
    MANAGER_CHAIN = 'MANAGER_CHAIN', // 상위 결재선 (depth 지정)
    DEPARTMENT_HEAD = 'DEPARTMENT_HEAD', // 부서장
    POSITION_BASED = 'POSITION_BASED', // 특정 직책
    ROLE_BASED = 'ROLE_BASED', // 특정 역할
    AMOUNT_BASED = 'AMOUNT_BASED', // 금액 기반
    RANK_BASED = 'RANK_BASED', // 직급 기반
}

/**
 * 고정 사용자 규칙
 * 예: {"type":"FIXED_USER","userId":"abc-123"}
 */
export interface FixedUserRule {
    type: AssigneeRuleType.FIXED_USER;
    userId: string;
}

/**
 * 직속 상관 규칙
 * 예: {"type":"DIRECT_MANAGER"}
 */
export interface DirectManagerRule {
    type: AssigneeRuleType.DIRECT_MANAGER;
}

/**
 * 상위 결재선 규칙 (n단계 위)
 * 예: {"type":"MANAGER_CHAIN","depth":2}
 */
export interface ManagerChainRule {
    type: AssigneeRuleType.MANAGER_CHAIN;
    depth: number; // 몇 단계 위까지
}

/**
 * 부서장 규칙
 * 예: {"type":"DEPARTMENT_HEAD","departmentId":"dept-123"}
 */
export interface DepartmentHeadRule {
    type: AssigneeRuleType.DEPARTMENT_HEAD;
    departmentId?: string; // null이면 기안자 부서의 부서장
}

/**
 * 특정 직책 규칙
 * 예: {"type":"POSITION_BASED","positionCode":"CFO"}
 */
export interface PositionBasedRule {
    type: AssigneeRuleType.POSITION_BASED;
    positionCode?: string;
    positionId?: string;
    departmentId?: string; // 특정 부서의 해당 직책
}

/**
 * 역할 기반 규칙
 * 예: {"type":"ROLE_BASED","roleCode":"HR_LEAD"}
 */
export interface RoleBasedRule {
    type: AssigneeRuleType.ROLE_BASED;
    roleCode: string;
}

/**
 * 금액 기반 규칙
 * 예: {"type":"AMOUNT_BASED","thresholds":[{"max":1000000,"userId":"manager1"},{"max":5000000,"userId":"director1"}]}
 */
export interface AmountBasedRule {
    type: AssigneeRuleType.AMOUNT_BASED;
    thresholds: Array<{
        max: number; // 최대 금액
        userId?: string;
        positionCode?: string;
    }>;
}

/**
 * 직급 기반 규칙
 * 예: {"type":"RANK_BASED","rankCode":"DIRECTOR","departmentId":"dept-123"}
 */
export interface RankBasedRule {
    type: AssigneeRuleType.RANK_BASED;
    rankCode: string;
    rankLevel?: number;
    departmentId?: string;
}

export type AssigneeRule =
    | FixedUserRule
    | DirectManagerRule
    | ManagerChainRule
    | DepartmentHeadRule
    | PositionBasedRule
    | RoleBasedRule
    | AmountBasedRule
    | RankBasedRule;
