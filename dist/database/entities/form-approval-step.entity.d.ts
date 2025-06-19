import { FormApprovalLine } from './form-approval-line.entity';
import { Employee } from './employee.entity';
import { ApprovalStepType } from 'src/common/enums/approval.enum';
export declare class FormApprovalStep {
    formApprovalStepId: string;
    type: ApprovalStepType;
    order: number;
    createdAt: Date;
    updatedAt: Date;
    defaultApproverId: string;
    defaultApprover: Employee;
    formApprovalLineId: string;
    formApprovalLine: FormApprovalLine;
}
