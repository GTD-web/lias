import { DocumentContext } from '../../../context/document/document.context';
import { TemplateContext } from '../../../context/template/template.context';
import { ApprovalProcessContext } from '../../../context/approval-process/approval-process.context';
import { NotificationContext } from '../../../context/notification/notification.context';
import { CreateDocumentDto, UpdateDocumentDto, SubmitDocumentDto, SubmitDocumentDirectDto } from '../dtos';
import { DocumentFilterDto } from '../../../context/document/dtos/document.dto';
export declare class DocumentService {
    private readonly documentContext;
    private readonly templateContext;
    private readonly approvalProcessContext;
    private readonly notificationContext;
    private readonly logger;
    constructor(documentContext: DocumentContext, templateContext: TemplateContext, approvalProcessContext: ApprovalProcessContext, notificationContext: NotificationContext);
    createDocument(dto: CreateDocumentDto): Promise<import("../../../domain").Document>;
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
    submitDocumentDirect(dto: SubmitDocumentDirectDto): Promise<import("../../../domain").Document>;
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
}
