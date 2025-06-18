import { FormApprovalLine } from './form-approval-line.entity';
import { DocumentType } from './document-type.entity';
export declare class DocumentForm {
    documentFormId: string;
    name: string;
    description: string;
    template: string;
    formApprovalLineId: string;
    formApprovalLine: FormApprovalLine;
    documentTypeId: string;
    documentType: DocumentType;
}
