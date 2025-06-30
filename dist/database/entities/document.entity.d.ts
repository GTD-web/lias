import { Employee } from './employee.entity';
import { File } from './file.entity';
import { ApprovalStep } from './approval-step.entity';
import { ApprovalStatus } from 'src/common/enums/approval.enum';
export declare class Document {
    documentId: string;
    documentNumber: string;
    documentType: string;
    title: string;
    content: string;
    status: ApprovalStatus;
    comment: string;
    retentionPeriod: string;
    retentionPeriodUnit: string;
    retentionStartDate: Date;
    retentionEndDate: Date;
    implementDate: Date;
    createdAt: Date;
    updatedAt: Date;
    drafterId: string;
    drafter: Employee;
    approvalSteps: ApprovalStep[];
    parentDocumentId: string;
    parentDocument: Document;
    childDocuments: Document[];
    files: File[];
}
