import { Repository } from 'typeorm';
import { Document } from './document.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';
export declare class DomainDocumentRepository extends BaseRepository<Document> {
    constructor(repository: Repository<Document>);
}
