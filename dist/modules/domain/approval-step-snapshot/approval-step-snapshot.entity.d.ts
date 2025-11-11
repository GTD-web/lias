import { ApprovalStepType, ApprovalStatus } from '../../../common/enums/approval.enum';
import { Employee } from '../employee/employee.entity';
import { Document } from '../document/document.entity';
export interface ApproverSnapshotMetadata {
    departmentId?: string;
    departmentName?: string;
    positionId?: string;
    positionTitle?: string;
    rankId?: string;
    rankTitle?: string;
    employeeName?: string;
    employeeNumber?: string;
}
export declare class ApprovalStepSnapshot {
    id: string;
    documentId: string;
    stepOrder: number;
    stepType: ApprovalStepType;
    approverId: string;
    approverSnapshot?: ApproverSnapshotMetadata;
    status: ApprovalStatus;
    comment?: string;
    approvedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    document: Document;
    approver: Employee;
}
