import { DomainDocumentRepository } from './document.repository';
import { BaseService } from '../../../common/services/base.service';
import { Document } from './document.entity';
import { DocumentStatus } from '../../../common/enums/approval.enum';
export declare class DomainDocumentService extends BaseService<Document> {
    private readonly documentRepository;
    constructor(documentRepository: DomainDocumentRepository);
    findByDocumentId(id: string): Promise<Document>;
    findByDocumentNumber(documentNumber: string): Promise<Document>;
    findByDrafterId(drafterId: string): Promise<Document[]>;
    findByStatus(status: DocumentStatus): Promise<Document[]>;
    findByDrafterIdAndStatus(drafterId: string, status: DocumentStatus): Promise<Document[]>;
}
