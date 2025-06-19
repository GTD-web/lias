import { Employee } from './employee.entity';
import { Document } from './document.entity';
export declare class DocumentReferencer {
    documentReferencerId: string;
    name: string;
    rank: string;
    referencerId: string;
    referencer: Employee;
    documentId: string;
    document: Document;
}
