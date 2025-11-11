import { DocumentService } from '../services/document.service';
import { CreateDocumentDto, UpdateDocumentDto, SubmitDocumentDto, SubmitDocumentDirectDto, QueryDocumentsDto } from '../dtos';
export declare class DocumentController {
    private readonly documentService;
    constructor(documentService: DocumentService);
    createDocument(dto: CreateDocumentDto): Promise<import("../../../domain").Document>;
    getDocuments(query: QueryDocumentsDto): Promise<{
        data: import("../../../domain").Document[];
        meta: {
            currentPage: number;
            itemsPerPage: number;
            totalItems: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
    }>;
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
