import { DocumentService } from '../services/document.service';
import { CreateDocumentDto, UpdateDocumentDto, SubmitDocumentBodyDto, SubmitDocumentDirectDto, QueryMyAllDocumentsDto } from '../dtos';
export declare class DocumentController {
    private readonly documentService;
    constructor(documentService: DocumentService);
    createDocument(dto: CreateDocumentDto): Promise<import("../../../domain").Document>;
    getMyAllDocumentsStatistics(userId: string): Promise<{
        DRAFT: number;
        PENDING: number;
        PENDING_AGREEMENT: number;
        PENDING_APPROVAL: number;
        IMPLEMENTATION: number;
        APPROVED: number;
        REJECTED: number;
        RECEIVED_REFERENCE: number;
    }>;
    getMyAllDocuments(query: QueryMyAllDocumentsDto): Promise<{
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
    getMyDrafts(drafterId: string, page?: number, limit?: number): Promise<{
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
    submitDocument(documentId: string, dto: SubmitDocumentBodyDto): Promise<import("../../../domain").Document>;
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
    getDocumentStatistics(userId: string): Promise<{
        myDocuments: {
            draft: number;
            submitted: number;
            agreement: number;
            approval: number;
            approved: number;
            rejected: number;
            implemented: number;
        };
        othersDocuments: {
            reference: number;
        };
    }>;
}
