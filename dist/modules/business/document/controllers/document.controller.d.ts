import { DocumentService } from '../services/document.service';
import { CreateDocumentDto, UpdateDocumentDto, SubmitDocumentDto, SubmitDocumentDirectDto } from '../dtos';
import { DocumentStatus } from '../../../../common/enums/approval.enum';
export declare class DocumentController {
    private readonly documentService;
    constructor(documentService: DocumentService);
    createDocument(dto: CreateDocumentDto): Promise<import("../../../domain").Document>;
    getDocuments(status?: DocumentStatus, drafterId?: string): Promise<import("../../../domain").Document[]>;
    getDocument(documentId: string): Promise<import("../../../domain").Document>;
    updateDocument(documentId: string, dto: UpdateDocumentDto): Promise<import("../../../domain").Document>;
    deleteDocument(documentId: string): Promise<void>;
    submitDocument(documentId: string, dto: Omit<SubmitDocumentDto, 'documentId'>): Promise<import("../../../domain").Document>;
    submitDocumentDirect(dto: SubmitDocumentDirectDto): Promise<import("../../../domain").Document>;
    getTemplateForNewDocument(templateId: string, drafterId: string): Promise<{
        approvalStepTemplates: any[];
        id: string;
        name: string;
        code: string;
        description?: string;
        status: import("../../../../common/enums/approval.enum").DocumentTemplateStatus;
        template: string;
        categoryId?: string;
        createdAt: Date;
        updatedAt: Date;
        category?: import("../../../domain").Category;
    }>;
}
