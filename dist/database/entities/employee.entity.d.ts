import { Role } from '../../common/enums/role-type.enum';
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
    accessToken: string;
    expiredAt: Date;
    roles: Role[];
    draftDocuments: Document[];
    defaultApprovers: FormApprovalStep[];
    approvers: ApprovalStep[];
}
