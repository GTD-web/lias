import { Repository } from 'typeorm';
import { DocumentType } from '../../../database/entities';
import { BaseRepository } from '../../../common/repositories/base.repository';
export declare class DomainDocumentTypeRepository extends BaseRepository<DocumentType> {
    constructor(repository: Repository<DocumentType>);
}
