import { Employee } from './employee.entity';
import { Document } from './document.entity';
export declare class DocumentReferencer {
    documentReferencerId: string;
    name: string;
    rank: string;
    order: number;
    referencerId: string;
    referencer: Employee;
    documentId: string;
    document: Document;
}
