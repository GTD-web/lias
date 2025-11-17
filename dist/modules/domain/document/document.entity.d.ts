import { DocumentStatus } from '../../../common/enums/approval.enum';
import { Employee } from '../employee/employee.entity';
import { ApprovalStepSnapshot } from '../approval-step-snapshot/approval-step-snapshot.entity';
import { DocumentRevision } from '../document-revision/document-revision.entity';
export declare class Document {
    id: string;
    documentNumber?: string;
    title: string;
    content: string;
    status: DocumentStatus;
    comment?: string;
    metadata?: Record<string, any>;
    drafterId: string;
    documentTemplateId?: string;
    retentionPeriod?: string;
    retentionPeriodUnit?: string;
    retentionStartDate?: Date;
    retentionEndDate?: Date;
    submittedAt?: Date;
    cancelReason?: string;
    cancelledAt?: Date;
    approvedAt?: Date;
    rejectedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    drafter: Employee;
    approvalSteps: ApprovalStepSnapshot[];
    revisions: DocumentRevision[];
}
