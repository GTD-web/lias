import { DataSource, QueryRunner } from 'typeorm';
import { Document } from '../../domain/document/document.entity';
import { DomainDocumentService } from '../../domain/document/document.service';
import { DocumentFilterDto } from './dtos/document.dto';
import { DocumentStatus } from '../../../common/enums/approval.enum';
import { DocumentFilterBuilder } from './document-filter.builder';
export declare class DocumentQueryService {
    private readonly dataSource;
    private readonly documentService;
    private readonly filterBuilder;
    private readonly logger;
    constructor(dataSource: DataSource, documentService: DomainDocumentService, filterBuilder: DocumentFilterBuilder);
    getDocument(documentId: string, userId?: string, queryRunner?: QueryRunner): Promise<{
        canCancelApproval: boolean;
        id: string;
        documentNumber?: string;
        title: string;
        content: string;
        status: DocumentStatus;
        comment?: string;
        metadata?: Record<string, any>;
        drafterId: string;
        documentTemplateId?: string;
        retentionPeriod?: string;
        retentionPeriodUnit?: string;
        retentionStartDate?: Date;
        retentionEndDate?: Date;
        submittedAt?: Date;
        cancelReason?: string;
        cancelledAt?: Date;
        approvedAt?: Date;
        rejectedAt?: Date;
        createdAt: Date;
        updatedAt: Date;
        drafter: import("../../domain").Employee;
        approvalSteps: import("../../domain").ApprovalStepSnapshot[];
        revisions: import("../../domain").DocumentRevision[];
        comments: import("../../domain").Comment[];
    }>;
    private calculateCanCancelApproval;
    getDocuments(filter: DocumentFilterDto, queryRunner?: QueryRunner): Promise<{
        data: Document[];
        meta: {
            currentPage: number;
            itemsPerPage: number;
            totalItems: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
    }>;
    getMyAllDocuments(params: {
        userId: string;
        filterType?: string;
        receivedStepType?: string;
        drafterFilter?: string;
        referenceReadStatus?: string;
        searchKeyword?: string;
        startDate?: Date;
        endDate?: Date;
        sortOrder?: string;
        page?: number;
        limit?: number;
    }): Promise<{
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
    getMyDrafts(drafterId: string, page?: number, limit?: number): Promise<{
        data: (Document | {
            drafter: {
                id: string;
                employeeNumber: string;
                name: string;
                email: string;
                department: {
                    id: string;
                    departmentName: string;
                    departmentCode: string;
                };
                position: {
                    id: string;
                    positionTitle: string;
                    positionCode: string;
                    level: number;
                };
                rank: {
                    id: string;
                    rankTitle: string;
                    rankCode: string;
                };
            };
            id: string;
            documentNumber?: string;
            title: string;
            content: string;
            status: DocumentStatus;
            comment?: string;
            metadata?: Record<string, any>;
            drafterId: string;
            documentTemplateId?: string;
            retentionPeriod?: string;
            retentionPeriodUnit?: string;
            retentionStartDate?: Date;
            retentionEndDate?: Date;
            submittedAt?: Date;
            cancelReason?: string;
            cancelledAt?: Date;
            approvedAt?: Date;
            rejectedAt?: Date;
            createdAt: Date;
            updatedAt: Date;
            approvalSteps: import("../../domain").ApprovalStepSnapshot[];
            revisions: import("../../domain").DocumentRevision[];
            comments: import("../../domain").Comment[];
        })[];
        meta: {
            currentPage: number;
            itemsPerPage: number;
            totalItems: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
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
    getMyAllDocumentsStatistics(userId: string): Promise<Record<string, number>>;
}
