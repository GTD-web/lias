import { DocumentTemplateStatus, ApprovalStepType, AssigneeRule } from '../../../../common/enums/approval.enum';
import { DepartmentType } from '../../../../common/enums/department.enum';
export declare class DepartmentDto {
    id: string;
    departmentName: string;
    departmentCode: string;
    type: DepartmentType;
    parentDepartmentId?: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}
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
    targetDepartment?: DepartmentDto;
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
