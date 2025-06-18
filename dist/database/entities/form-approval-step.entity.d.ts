import { FormApprovalLine } from './form-approval-line.entity';
import { Employee } from './employee.entity';
import { ApprovalStepType, ApproverType, DepartmentScopeType } from 'src/common/enums/approval.enum';
export declare class FormApprovalStep {
    formApprovalStepId: string;
    type: ApprovalStepType;
    order: number;
    approverType: ApproverType;
    approverValue: string;
    departmentScopeType: DepartmentScopeType;
    conditionExpression: object;
    isMandatory: boolean;
    createdAt: Date;
    updatedAt: Date;
    defaultApproverId: string;
    defaultApprover: Employee;
    formApprovalLineId: string;
    formApprovalLine: FormApprovalLine;
}
