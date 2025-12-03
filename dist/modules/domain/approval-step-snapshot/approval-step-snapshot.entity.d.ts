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
    문서를설정한다(documentId: string): void;
    결재단계순서를설정한다(stepOrder: number): void;
    결재단계타입을설정한다(stepType: ApprovalStepType): void;
    결재자를설정한다(approverId: string): void;
    결재자스냅샷을설정한다(approverSnapshot: ApproverSnapshotMetadata): void;
    의견을설정한다(comment: string): void;
    승인한다(): void;
    반려한다(): void;
    대기한다(): void;
    취소한다(): void;
}
