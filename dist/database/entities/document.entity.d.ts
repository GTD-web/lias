import { Employee } from './employee.entity';
import { File } from './file.entity';
import { ApprovalStep } from './approval-step.entity';
import { DocumentImplementer } from './document-implementer.entity';
import { DocumentReferencer } from './document-referencer.entity';
export declare class Document {
    documentId: string;
    documentNumber: string;
    documentType: string;
    title: string;
    content: string;
    status: string;
    retentionPeriod: string;
    retentionPeriodUnit: string;
    retentionStartDate: Date;
    retentionEndDate: Date;
    implementDate: Date;
    createdAt: Date;
    updatedAt: Date;
    drafterId: string;
    drafter: Employee;
    implementers: DocumentImplementer[];
    referencers: DocumentReferencer[];
    approvalSteps: ApprovalStep[];
    parentDocumentId: string;
    parentDocument: Document;
    childDocuments: Document[];
    files: File[];
}
