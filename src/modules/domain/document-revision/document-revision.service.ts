import { Injectable } from '@nestjs/common';
import { DocumentRevisionRepository } from './document-revision.repository';
import { BaseService } from '../../../common/services/base.service';
import { DocumentRevision } from './document-revision.entity';

@Injectable()
export class DocumentRevisionService extends BaseService<DocumentRevision> {
    constructor(private readonly documentRevisionRepository: DocumentRevisionRepository) {
        super(documentRevisionRepository);
    }
}
