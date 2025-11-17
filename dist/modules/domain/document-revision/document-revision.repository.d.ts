import { Repository } from 'typeorm';
import { DocumentRevision } from './document-revision.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';
export declare class DocumentRevisionRepository extends BaseRepository<DocumentRevision> {
    constructor(repository: Repository<DocumentRevision>);
}
