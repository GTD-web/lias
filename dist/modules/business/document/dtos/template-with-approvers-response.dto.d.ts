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
    positionId?: string;
    positionTitle?: string;
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
export declare class PositionDto {
    id: string;
    positionTitle: string;
    positionCode: string;
    level: number;
}
export declare class DrafterDepartmentDto {
    id: string;
    departmentName: string;
    departmentCode: string;
}
export declare class DrafterDto {
    id: string;
    employeeNumber: string;
    name: string;
    email: string;
    department: DrafterDepartmentDto;
    position: PositionDto;
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
    drafter: DrafterDto;
    approvalStepTemplates: ApprovalStepTemplateWithApproversDto[];
    createdAt: Date;
    updatedAt: Date;
}
