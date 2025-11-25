import { DocumentContext } from '../../../context/document/document.context';
import { TemplateContext } from '../../../context/template/template.context';
import { ApprovalProcessContext } from '../../../context/approval-process/approval-process.context';
import { NotificationContext } from '../../../context/notification/notification.context';
import { CommentContext } from '../../../context/comment/comment.context';
import { CreateDocumentDto, UpdateDocumentDto, SubmitDocumentDto, SubmitDocumentDirectDto } from '../dtos';
import { DocumentFilterDto } from '../../../context/document/dtos/document.dto';
import { CreateCommentDto, UpdateCommentDto } from '../dtos/comment.dto';
export declare class DocumentService {
    private readonly documentContext;
    private readonly templateContext;
    private readonly approvalProcessContext;
    private readonly notificationContext;
    private readonly commentContext;
    private readonly logger;
    constructor(documentContext: DocumentContext, templateContext: TemplateContext, approvalProcessContext: ApprovalProcessContext, notificationContext: NotificationContext, commentContext: CommentContext);
    createDocument(dto: CreateDocumentDto, drafterId: string): Promise<import("../../../domain").Document>;
    updateDocument(documentId: string, dto: UpdateDocumentDto): Promise<import("../../../domain").Document>;
    deleteDocument(documentId: string): Promise<{
        deleted: boolean;
        documentId: string;
    }>;
    getDocument(documentId: string): Promise<import("../../../domain").Document>;
    getDocuments(filter: DocumentFilterDto): Promise<{
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
    submitDocument(dto: SubmitDocumentDto): Promise<import("../../../domain").Document>;
    private sendSubmitNotification;
    submitDocumentDirect(dto: SubmitDocumentDirectDto, drafterId: string): Promise<import("../../../domain").Document>;
    getTemplateForNewDocument(templateId: string, drafterId: string): Promise<{
        approvalStepTemplates: any[];
        id: string;
        name: string;
        code: string;
        description?: string;
        status: import("src/common/enums/approval.enum").DocumentTemplateStatus;
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
    getMyAllDocumentsStatistics(userId: string): Promise<{
        DRAFT: number;
        RECEIVED: number;
        PENDING: number;
        PENDING_AGREEMENT: number;
        PENDING_APPROVAL: number;
        IMPLEMENTATION: number;
        APPROVED: number;
        REJECTED: number;
        RECEIVED_REFERENCE: number;
    }>;
    getMyAllDocuments(params: {
        userId: string;
        filterType?: string;
        approvalStatus?: string;
        referenceReadStatus?: string;
        searchKeyword?: string;
        categoryId?: string;
        startDate?: Date;
        endDate?: Date;
        page?: number;
        limit?: number;
    }): Promise<{
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
    getMyDrafts(drafterId: string, page: number, limit: number): Promise<{
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
    createComment(documentId: string, dto: CreateCommentDto, authorId: string): Promise<import("../../../domain").Comment>;
    updateComment(commentId: string, dto: UpdateCommentDto, authorId: string): Promise<import("../../../domain").Comment>;
    deleteComment(commentId: string, authorId: string): Promise<import("../../../domain").Comment>;
    getDocumentComments(documentId: string): Promise<import("../../../domain").Comment[]>;
    getComment(commentId: string): Promise<import("../../../domain").Comment>;
}
