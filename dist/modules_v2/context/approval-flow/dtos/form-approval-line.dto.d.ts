import { AssigneeRule, ApprovalStepType, ApprovalLineType, DepartmentScopeType } from '../../../../common/enums/approval.enum';
export declare class CreateFormWithApprovalLineDto {
    formName: string;
    formCode: string;
    description?: string;
    template?: string;
    useExistingLine: boolean;
    lineTemplateVersionId?: string;
    baseLineTemplateVersionId?: string;
    stepEdits?: StepEditDto[];
    createdBy?: string;
}
export declare class StepEditDto {
    stepOrder: number;
    stepType: ApprovalStepType;
    assigneeRule: AssigneeRule;
    targetDepartmentId?: string;
    targetPositionId?: string;
    targetEmployeeId?: string;
    isRequired: boolean;
}
export declare class UpdateFormVersionDto {
    formId: string;
    versionNote?: string;
    template?: string;
    lineTemplateVersionId?: string;
    cloneAndEdit?: boolean;
    baseLineTemplateVersionId?: string;
    stepEdits?: StepEditDto[];
    createdBy?: string;
}
export declare class CloneApprovalLineTemplateDto {
    baseTemplateVersionId: string;
    newTemplateName?: string;
    stepEdits?: StepEditDto[];
    createdBy?: string;
}
export declare class CreateApprovalLineTemplateVersionDto {
    templateId: string;
    versionNote?: string;
    steps: StepEditDto[];
    createdBy?: string;
}
export declare class CreateApprovalLineTemplateDto {
    name: string;
    description?: string;
    type: ApprovalLineType;
    orgScope: DepartmentScopeType;
    departmentId?: string;
    steps: StepEditDto[];
    createdBy?: string;
}
