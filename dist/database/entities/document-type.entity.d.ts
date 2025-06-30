import { DocumentForm } from './document-form.entity';
export declare class DocumentType {
    documentTypeId: string;
    name: string;
    documentNumberCode: string;
    documentForms: DocumentForm[];
}
