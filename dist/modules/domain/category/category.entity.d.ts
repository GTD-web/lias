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
    이름을설정한다(name: string): void;
    코드를설정한다(code: string): void;
    설명을설정한다(description?: string): void;
    정렬순서를설정한다(order: number): void;
}
