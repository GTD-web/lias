import { ApprovalStepType, AssigneeRule } from '../enums/approval.enum';
export declare class ApprovalRuleValidator {
    private static readonly RULE_MAP;
    static getAllowedRules(stepType: ApprovalStepType): AssigneeRule[];
    static isValid(stepType: ApprovalStepType, rule: AssigneeRule): boolean;
    static getRequiredTargetFields(rule: AssigneeRule): {
        needsEmployee?: boolean;
        needsDepartment?: boolean;
        needsPosition?: boolean;
    };
    static validateRequiredTargetFields(rule: AssigneeRule, targetFields: {
        targetEmployeeId?: string;
        targetDepartmentId?: string;
        targetPositionId?: string;
        targetRankId?: string;
    }): {
        isValid: boolean;
        missingFields: string[];
    };
    static validateComplete(stepType: ApprovalStepType, rule: AssigneeRule, targetFields?: {
        targetEmployeeId?: string;
        targetDepartmentId?: string;
        targetPositionId?: string;
    }): {
        isValid: boolean;
        errors: string[];
    };
}
