import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentRevision } from './document-revision.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';

@Injectable()
export class DocumentRevisionRepository extends BaseRepository<DocumentRevision> {
    constructor(
        @InjectRepository(DocumentRevision)
        repository: Repository<DocumentRevision>,
    ) {
        super(repository);
    }
}

