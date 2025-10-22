import { DataSource, QueryRunner } from 'typeorm';
import { DomainDocumentService } from '../../domain/document/document.service';
import { DomainFormVersionService } from '../../domain/form/form-version.service';
import { DomainEmployeeService } from '../../domain/employee/employee.service';
import { CreateDocumentDto, UpdateDocumentDto, SubmitDocumentDto, DocumentFilterDto } from './dtos/document.dto';
export declare class DocumentContext {
    private readonly dataSource;
    private readonly documentService;
    private readonly formVersionService;
    private readonly employeeService;
    private readonly logger;
    constructor(dataSource: DataSource, documentService: DomainDocumentService, formVersionService: DomainFormVersionService, employeeService: DomainEmployeeService);
    createDocument(dto: CreateDocumentDto, externalQueryRunner?: QueryRunner): Promise<import("../../domain").Document>;
    updateDocument(documentId: string, dto: UpdateDocumentDto, externalQueryRunner?: QueryRunner): Promise<import("../../domain").Document>;
    submitDocument(dto: SubmitDocumentDto, approvalLineSnapshotId: string, externalQueryRunner?: QueryRunner): Promise<import("../../domain").Document>;
    deleteDocument(documentId: string, externalQueryRunner?: QueryRunner): Promise<{
        deleted: boolean;
        documentId: string;
    }>;
    getDocument(documentId: string, queryRunner?: QueryRunner): Promise<import("../../domain").Document>;
    getDocuments(filter: DocumentFilterDto, queryRunner?: QueryRunner): Promise<import("../../domain").Document[]>;
    private generateDocumentNumber;
}
