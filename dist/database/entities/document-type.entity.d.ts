import { Document } from './document.entity';
import { ApprovalLineTemplate } from './form-approval-line.entity';
export declare class DocumentType {
    documentTypeId: string;
    type: string;
    name: string;
    description: string;
    template: string;
    documents: Document[];
    approvalLineTemplates: ApprovalLineTemplate[];
}
