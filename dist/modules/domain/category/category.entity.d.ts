import { DocumentTemplate } from '../document-template/document-template.entity';
export declare class Category {
    id: string;
    name: string;
    code: string;
    description?: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
    documentTemplates: DocumentTemplate[];
}
