import { Document } from '../document/document.entity';
import { Employee } from '../employee/employee.entity';
import { ApprovalStepSnapshot } from '../approval-step-snapshot/approval-step-snapshot.entity';
export type DocumentSnapshotMetadata = Omit<Document, 'drafter' | 'approvalSteps' | 'revisions'>;
export type ApprovalStepSnapshotMetadata = Omit<ApprovalStepSnapshot, 'document' | 'approver'>;
export declare class DocumentRevision {
    id: string;
    documentId: string;
    revisionNumber: number;
    documentSnapshot: DocumentSnapshotMetadata;
    approvalStepsSnapshot?: ApprovalStepSnapshotMetadata[];
    revisionComment?: string;
    revisedById: string;
    createdAt: Date;
    document: Document;
    revisedBy: Employee;
}
