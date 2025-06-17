import { DomainDocumentRepository } from './document.repository';
import { BaseService } from '../../../common/services/base.service';
import { Document } from '../../../database/entities';
export declare class DomainDocumentService extends BaseService<Document> {
    private readonly documentRepository;
    constructor(documentRepository: DomainDocumentRepository);
}
