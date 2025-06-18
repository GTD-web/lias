import { DomainDocumentTypeRepository } from './document-type.repository';
import { BaseService } from '../../../common/services/base.service';
import { DocumentType } from '../../../database/entities';
export declare class DomainDocumentTypeService extends BaseService<DocumentType> {
    private readonly documentTypeRepository;
    constructor(documentTypeRepository: DomainDocumentTypeRepository);
}
