import { DocumentService } from '../services/document.service';
import { CreateDocumentDto, UpdateDocumentDto, SubmitDocumentBodyDto, SubmitDocumentDirectDto, QueryMyAllDocumentsDto } from '../dtos';
import { CreateCommentDto, UpdateCommentDto } from '../dtos/comment.dto';
import { Employee } from '../../../domain/employee/employee.entity';
export declare class DocumentController {
    private readonly documentService;
    constructor(documentService: DocumentService);
    createDocument(user: Employee, dto: CreateDocumentDto): Promise<import("../../../domain").Document>;
    getMyAllDocumentsStatistics(user: Employee): Promise<Record<string, number>>;
    getMyAllDocuments(user: Employee, query: QueryMyAllDocumentsDto): Promise<{
        data: any[];
        meta: {
            currentPage: number;
            itemsPerPage: number;
            totalItems: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
    }>;
    getMyDrafts(user: Employee, page?: number, limit?: number): Promise<{
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
    updateDocument(user: Employee, documentId: string, dto: UpdateDocumentDto): Promise<import("../../../domain").Document>;
    deleteDocument(documentId: string): Promise<void>;
    submitDocument(documentId: string, dto: SubmitDocumentBodyDto): Promise<import("../../../domain").Document>;
    submitDocumentDirect(user: Employee, dto: SubmitDocumentDirectDto): Promise<import("../../../domain").Document>;
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
    createComment(documentId: string, user: Employee, dto: CreateCommentDto): Promise<import("../../../domain").Comment>;
    getDocumentComments(documentId: string): Promise<import("../../../domain").Comment[]>;
    updateComment(commentId: string, user: Employee, dto: UpdateCommentDto): Promise<import("../../../domain").Comment>;
    deleteComment(commentId: string, user: Employee): Promise<void>;
    getComment(commentId: string): Promise<import("../../../domain").Comment>;
}
