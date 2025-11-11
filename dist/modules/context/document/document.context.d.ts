import { DataSource, QueryRunner } from 'typeorm';
import { Document } from '../../domain/document/document.entity';
import { DomainDocumentService } from '../../domain/document/document.service';
import { DomainDocumentTemplateService } from '../../domain/document-template/document-template.service';
import { DomainEmployeeService } from '../../domain/employee/employee.service';
import { DomainApprovalStepSnapshotService } from '../../domain/approval-step-snapshot/approval-step-snapshot.service';
import { CreateDocumentDto, UpdateDocumentDto, SubmitDocumentDto, DocumentFilterDto } from './dtos/document.dto';
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
    private autoApproveIfDrafterIsFirstApprover;
    private buildApproverSnapshot;
}
