import { Repository } from 'typeorm';
import { Document } from './document.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { DocumentStatus } from '../../../common/enums/approval.enum';
export declare class DomainDocumentRepository extends BaseRepository<Document> {
    constructor(repository: Repository<Document>);
    findByDocumentNumber(documentNumber: string): Promise<Document | null>;
    findByDrafterId(drafterId: string): Promise<Document[]>;
    findByStatus(status: DocumentStatus): Promise<Document[]>;
    findByDrafterIdAndStatus(drafterId: string, status: DocumentStatus): Promise<Document[]>;
}
