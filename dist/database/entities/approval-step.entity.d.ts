import { Employee } from './employee.entity';
import { Document } from './document.entity';
export declare class ApprovalStep {
    approvalStepId: string;
    type: string;
    name: string;
    description: string;
    order: number;
    approvedDate: Date;
    createdAt: Date;
    updatedAt: Date;
    approverId: string;
    approver: Employee;
    documentId: string;
    document: Document;
}
