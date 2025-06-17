import { Document } from './document.entity';
export declare class File {
    fileId: string;
    fileName: string;
    filePath: string;
    createdAt: Date;
    documentId: string;
    document: Document;
}
