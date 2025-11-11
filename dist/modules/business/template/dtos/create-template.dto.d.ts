import { DocumentTemplateStatus, ApprovalStepType, AssigneeRule } from '../../../../common/enums/approval.enum';
export declare class ApprovalStepTemplateItemDto {
    stepOrder?: number;
    stepType: ApprovalStepType;
    assigneeRule: AssigneeRule;
    targetEmployeeId?: string;
    targetDepartmentId?: string;
    targetPositionId?: string;
}
export declare class CreateTemplateDto {
    name: string;
    code: string;
    description?: string;
    template: string;
    status?: DocumentTemplateStatus;
    categoryId?: string;
    approvalSteps: ApprovalStepTemplateItemDto[];
}
