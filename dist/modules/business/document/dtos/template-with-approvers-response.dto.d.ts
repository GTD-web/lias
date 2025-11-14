import { DocumentTemplateStatus, ApprovalStepType, AssigneeRule } from '../../../../common/enums/approval.enum';
export declare class MappedApproverDto {
    employeeId: string;
    employeeNumber: string;
    name: string;
    email: string;
    type: string;
}
export declare class ApprovalStepTemplateWithApproversDto {
    id: string;
    documentTemplateId: string;
    stepOrder: number;
    stepType: ApprovalStepType;
    assigneeRule: AssigneeRule;
    targetEmployeeId?: string;
    targetDepartmentId?: string;
    targetPositionId?: string;
    mappedApprovers: MappedApproverDto[];
    createdAt: Date;
    updatedAt: Date;
}
export declare class CategoryResponseDto {
    id: string;
    name: string;
    code: string;
    description?: string;
}
export declare class DocumentTemplateWithApproversResponseDto {
    id: string;
    name: string;
    code: string;
    description?: string;
    status: DocumentTemplateStatus;
    template: string;
    categoryId?: string;
    category?: CategoryResponseDto;
    approvalStepTemplates: ApprovalStepTemplateWithApproversDto[];
    createdAt: Date;
    updatedAt: Date;
}
