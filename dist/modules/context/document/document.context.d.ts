import { DataSource, QueryRunner } from 'typeorm';
import { Document } from '../../domain/document/document.entity';
import { DomainDocumentService } from '../../domain/document/document.service';
import { DomainDocumentTemplateService } from '../../domain/document-template/document-template.service';
import { DomainEmployeeService } from '../../domain/employee/employee.service';
import { DomainApprovalStepSnapshotService } from '../../domain/approval-step-snapshot/approval-step-snapshot.service';
import { CreateDocumentDto, UpdateDocumentDto, SubmitDocumentDto, DocumentFilterDto } from './dtos/document.dto';
import { DocumentStatus } from '../../../common/enums/approval.enum';
import { ApprovalStepSnapshot } from '../../domain/approval-step-snapshot/approval-step-snapshot.entity';
export interface DocumentModificationHistoryItem {
    previousTitle: string;
    previousContent: string;
    modifiedAt: string;
    modificationComment: string;
    documentStatus: DocumentStatus;
}
export declare class DocumentContext {
    private readonly dataSource;
    private readonly documentService;
    private readonly documentTemplateService;
    private readonly employeeService;
    private readonly approvalStepSnapshotService;
    private readonly logger;
    constructor(dataSource: DataSource, documentService: DomainDocumentService, documentTemplateService: DomainDocumentTemplateService, employeeService: DomainEmployeeService, approvalStepSnapshotService: DomainApprovalStepSnapshotService);
    createDocument(dto: CreateDocumentDto, externalQueryRunner?: QueryRunner): Promise<Document>;
    updateDocument(documentId: string, dto: UpdateDocumentDto, externalQueryRunner?: QueryRunner): Promise<Document>;
    submitDocument(dto: SubmitDocumentDto, externalQueryRunner?: QueryRunner): Promise<Document>;
    private generateDocumentNumber;
    deleteDocument(documentId: string, externalQueryRunner?: QueryRunner): Promise<{
        deleted: boolean;
        documentId: string;
    }>;
    getDocument(documentId: string, queryRunner?: QueryRunner): Promise<Document>;
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
    private createApprovalStepSnapshots;
    private updateApprovalStepSnapshots;
    private buildApproverSnapshot;
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
    private applyFilterTypeCondition;
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
            approvalSteps: ApprovalStepSnapshot[];
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
}
