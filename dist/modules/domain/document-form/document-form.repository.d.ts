import { Repository } from 'typeorm';
import { DocumentForm } from '../../../database/entities';
import { BaseRepository } from '../../../common/repositories/base.repository';
export declare class DomainDocumentFormRepository extends BaseRepository<DocumentForm> {
    constructor(repository: Repository<DocumentForm>);
}
