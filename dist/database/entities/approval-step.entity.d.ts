import { Employee } from './employee.entity';
import { Document } from './document.entity';
import { ApprovalStepType } from 'src/common/enums/approval.enum';
export declare class ApprovalStep {
    approvalStepId: string;
    type: ApprovalStepType;
    order: number;
    isApproved: boolean;
    approvedDate: Date;
    isCurrent: boolean;
    createdAt: Date;
    updatedAt: Date;
    approverId: string;
    approver: Employee;
    documentId: string;
    document: Document;
}
