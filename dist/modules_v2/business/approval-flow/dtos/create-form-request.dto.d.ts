import { ApprovalStepType, AssigneeRule } from '../../../../common/enums/approval.enum';
export declare class StepEditRequestDto {
    stepOrder: number;
    stepType: ApprovalStepType;
    assigneeRule: AssigneeRule;
    targetDepartmentId?: string;
    targetPositionId?: string;
    targetEmployeeId?: string;
    isRequired: boolean;
}
export declare class CreateFormRequestDto {
    formName: string;
    formCode: string;
    description?: string;
    template?: string;
    useExistingLine?: boolean;
    lineTemplateVersionId?: string;
    baseLineTemplateVersionId?: string;
    stepEdits?: StepEditRequestDto[];
}
