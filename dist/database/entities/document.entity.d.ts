import { Employee } from './employee.entity';
import { DocumentForm } from './document-form.entity';
import { File } from './file.entity';
import { ApprovalStep } from './approval-step.entity';
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
    createdAt: Date;
    updatedAt: Date;
    employeeId: string;
    employee: Employee;
    documentFormId: string;
    documentForm: DocumentForm;
    approvalSteps: ApprovalStep[];
    parentDocumentId: string;
    parentDocument: Document;
    childDocuments: Document[];
    files: File[];
}
