import { DocumentTemplateStatus, ApprovalStepType, AssigneeRule } from '../../../../common/enums/approval.enum';
export declare class CreateDocumentTemplateDto {
    name: string;
    code: string;
    description?: string;
    template: string;
    status?: DocumentTemplateStatus;
    categoryId?: string;
}
export declare class UpdateDocumentTemplateDto {
    name?: string;
    description?: string;
    template?: string;
    status?: DocumentTemplateStatus;
    categoryId?: string | null;
}
export declare class CreateApprovalStepTemplateDto {
    documentTemplateId: string;
    stepOrder?: number;
    stepType: ApprovalStepType;
    assigneeRule: AssigneeRule;
    targetEmployeeId?: string;
    targetDepartmentId?: string;
    targetPositionId?: string;
}
export declare class UpdateApprovalStepTemplateDto {
    stepOrder?: number;
    stepType?: ApprovalStepType;
    assigneeRule?: AssigneeRule;
    targetEmployeeId?: string | null;
    targetDepartmentId?: string | null;
    targetPositionId?: string | null;
}
