import { ApprovalLineType, ApprovalStepType } from 'src/common/enums/approval.enum';
export declare class CreateFormApprovalStepDto {
    type: ApprovalStepType;
    order: number;
    defaultApproverId: string;
}
export declare class CreateFormApprovalLineDto {
    name: string;
    description?: string;
    type: ApprovalLineType;
    formApprovalSteps: CreateFormApprovalStepDto[];
}
export declare class UpdateFormApprovalLineDto {
    name?: string;
    description?: string;
    type?: ApprovalLineType;
    formApprovalLineId: string;
    formApprovalSteps?: CreateFormApprovalStepDto[];
}
export declare class ApproverResponseDto {
    employeeId: string;
    name: string;
    employeeNumber: string;
    department?: string;
    position?: string;
    rank?: string;
}
export declare class FormApprovalStepResponseDto {
    formApprovalStepId: string;
    type: ApprovalStepType;
    order: number;
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
