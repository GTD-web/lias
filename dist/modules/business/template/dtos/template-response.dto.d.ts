import { DocumentTemplateStatus, ApprovalStepType, AssigneeRule } from '../../../../common/enums/approval.enum';
export declare class CategoryDocumentTemplateDto {
    id: string;
    name: string;
    code: string;
    description?: string;
    status: DocumentTemplateStatus;
}
export declare class CategoryResponseDto {
    id: string;
    name: string;
    code: string;
    description?: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
    documentTemplates?: CategoryDocumentTemplateDto[];
}
export declare class ApprovalStepTemplateResponseDto {
    id: string;
    documentTemplateId: string;
    stepOrder: number;
    stepType: ApprovalStepType;
    assigneeRule: AssigneeRule;
    targetEmployeeId?: string;
    targetDepartmentId?: string;
    targetPositionId?: string;
}
export declare class DocumentTemplateResponseDto {
    id: string;
    name: string;
    code: string;
    description?: string;
    status: DocumentTemplateStatus;
    template: string;
    categoryId?: string;
    category?: CategoryResponseDto;
    approvalStepTemplates?: ApprovalStepTemplateResponseDto[];
    createdAt: Date;
    updatedAt: Date;
}
export declare class CreateTemplateResponseDto {
    documentTemplate: DocumentTemplateResponseDto;
    approvalSteps: ApprovalStepTemplateResponseDto[];
}
