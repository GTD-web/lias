"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalRuleValidator = void 0;
const approval_enum_1 = require("../enums/approval.enum");
class ApprovalRuleValidator {
    static getAllowedRules(stepType) {
        return this.RULE_MAP[stepType] ?? [approval_enum_1.AssigneeRule.FIXED];
    }
    static isValid(stepType, rule) {
        return this.getAllowedRules(stepType).includes(rule);
    }
    static getRequiredTargetFields(rule) {
        switch (rule) {
            case approval_enum_1.AssigneeRule.FIXED:
                return { needsEmployee: true };
            case approval_enum_1.AssigneeRule.HIERARCHY_TO_POSITION:
                return { needsPosition: true };
            case approval_enum_1.AssigneeRule.DEPARTMENT_REFERENCE:
                return { needsDepartment: true };
            case approval_enum_1.AssigneeRule.DRAFTER:
            case approval_enum_1.AssigneeRule.HIERARCHY_TO_SUPERIOR:
                return {};
            default:
                return {};
        }
    }
    static validateRequiredTargetFields(rule, targetFields) {
        const required = this.getRequiredTargetFields(rule);
        const missingFields = [];
        if (required.needsEmployee && !targetFields.targetEmployeeId) {
            missingFields.push('targetEmployeeId');
        }
        if (required.needsDepartment && !targetFields.targetDepartmentId) {
            missingFields.push('targetDepartmentId');
        }
        if (required.needsPosition && !targetFields.targetPositionId) {
            missingFields.push('targetPositionId');
        }
        return {
            isValid: missingFields.length === 0,
            missingFields,
        };
    }
    static validateComplete(stepType, rule, targetFields) {
        const errors = [];
        if (!this.isValid(stepType, rule)) {
            errors.push(`${stepType} 타입에서는 ${rule} 규칙을 사용할 수 없습니다. 허용되는 규칙: ${this.getAllowedRules(stepType).join(', ')}`);
        }
        if (targetFields) {
            const targetValidation = this.validateRequiredTargetFields(rule, targetFields);
            if (!targetValidation.isValid) {
                errors.push(`${rule} 규칙에는 다음 필드가 필요합니다: ${targetValidation.missingFields.join(', ')}`);
            }
        }
        return {
            isValid: errors.length === 0,
            errors,
        };
    }
}
exports.ApprovalRuleValidator = ApprovalRuleValidator;
ApprovalRuleValidator.RULE_MAP = {
    [approval_enum_1.ApprovalStepType.AGREEMENT]: [approval_enum_1.AssigneeRule.FIXED],
    [approval_enum_1.ApprovalStepType.APPROVAL]: [
        approval_enum_1.AssigneeRule.FIXED,
        approval_enum_1.AssigneeRule.DRAFTER,
        approval_enum_1.AssigneeRule.HIERARCHY_TO_SUPERIOR,
        approval_enum_1.AssigneeRule.HIERARCHY_TO_POSITION,
    ],
    [approval_enum_1.ApprovalStepType.IMPLEMENTATION]: [approval_enum_1.AssigneeRule.FIXED, approval_enum_1.AssigneeRule.DRAFTER],
    [approval_enum_1.ApprovalStepType.REFERENCE]: [approval_enum_1.AssigneeRule.FIXED, approval_enum_1.AssigneeRule.DEPARTMENT_REFERENCE],
};
//# sourceMappingURL=approval-rule-validator.js.map