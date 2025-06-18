import { ApprovalLineType, ApprovalStepType, ApproverType, DepartmentScopeType } from 'src/common/enums/approval.enum';
export declare class CreateFormApprovalStepDto {
    type: ApprovalStepType;
    order: number;
    approverType: ApproverType;
    approverValue: string;
    departmentScopeType: DepartmentScopeType;
    conditionExpression: object;
    isMandatory: boolean;
    defaultApproverId: string;
}
export declare class CreateFormApprovalLineDto {
    name: string;
    description?: string;
    type: ApprovalLineType;
    formApprovalSteps: CreateFormApprovalStepDto[];
}
declare const UpdateFormApprovalLineDto_base: import("@nestjs/common").Type<Partial<CreateFormApprovalLineDto>>;
export declare class UpdateFormApprovalLineDto extends UpdateFormApprovalLineDto_base {
}
export declare class ApproverResponseDto {
    employeeId: string;
    name: string;
    employeeNumber: string;
    department: string;
    position: string;
    rank: string;
}
export declare class FormApprovalStepResponseDto {
    formApprovalStepId: string;
    type: ApprovalStepType;
    order: number;
    approverType: ApproverType;
    approverValue: string;
    departmentScopeType: DepartmentScopeType;
    conditionExpression: object;
    isMandatory: boolean;
    defaultApprover: ApproverResponseDto;
}
export declare class FormApprovalLineResponseDto {
    formApprovalLineId: string;
    name: string;
    description: string;
    type: ApprovalLineType;
    isActive: boolean;
    order: number;
    createdAt: Date;
    updatedAt: Date;
    formApprovalSteps: FormApprovalStepResponseDto[];
}
export {};
