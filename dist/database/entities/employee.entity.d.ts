import { Document } from './document.entity';
import { FormApprovalStep } from './form-approval-step.entity';
import { ApprovalStep } from './approval-step.entity';
export declare class Employee {
    employeeId: string;
    name: string;
    employeeNumber: string;
    email: string;
    department: string;
    position: string;
    rank: string;
    documents: Document[];
    defaultApprovers: FormApprovalStep[];
    approvers: ApprovalStep[];
}
