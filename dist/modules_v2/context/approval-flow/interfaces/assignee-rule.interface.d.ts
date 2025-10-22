export declare enum AssigneeRuleType {
    FIXED_USER = "FIXED_USER",
    DIRECT_MANAGER = "DIRECT_MANAGER",
    MANAGER_CHAIN = "MANAGER_CHAIN",
    DEPARTMENT_HEAD = "DEPARTMENT_HEAD",
    POSITION_BASED = "POSITION_BASED",
    ROLE_BASED = "ROLE_BASED",
    AMOUNT_BASED = "AMOUNT_BASED",
    RANK_BASED = "RANK_BASED"
}
export interface FixedUserRule {
    type: AssigneeRuleType.FIXED_USER;
    userId: string;
}
export interface DirectManagerRule {
    type: AssigneeRuleType.DIRECT_MANAGER;
}
export interface ManagerChainRule {
    type: AssigneeRuleType.MANAGER_CHAIN;
    depth: number;
}
export interface DepartmentHeadRule {
    type: AssigneeRuleType.DEPARTMENT_HEAD;
    departmentId?: string;
}
export interface PositionBasedRule {
    type: AssigneeRuleType.POSITION_BASED;
    positionCode?: string;
    positionId?: string;
    departmentId?: string;
}
export interface RoleBasedRule {
    type: AssigneeRuleType.ROLE_BASED;
    roleCode: string;
}
export interface AmountBasedRule {
    type: AssigneeRuleType.AMOUNT_BASED;
    thresholds: Array<{
        max: number;
        userId?: string;
        positionCode?: string;
    }>;
}
export interface RankBasedRule {
    type: AssigneeRuleType.RANK_BASED;
    rankCode: string;
    rankLevel?: number;
    departmentId?: string;
}
export type AssigneeRule = FixedUserRule | DirectManagerRule | ManagerChainRule | DepartmentHeadRule | PositionBasedRule | RoleBasedRule | AmountBasedRule | RankBasedRule;
