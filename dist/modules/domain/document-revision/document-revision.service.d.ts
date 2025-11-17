import { DocumentRevisionRepository } from './document-revision.repository';
import { BaseService } from '../../../common/services/base.service';
import { DocumentRevision } from './document-revision.entity';
export declare class DocumentRevisionService extends BaseService<DocumentRevision> {
    private readonly documentRevisionRepository;
    constructor(documentRevisionRepository: DocumentRevisionRepository);
}
