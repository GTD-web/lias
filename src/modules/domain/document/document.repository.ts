import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { DocumentStatus } from '../../../common/enums/approval.enum';

@Injectable()
export class DomainDocumentRepository extends BaseRepository<Document> {
    constructor(
        @InjectRepository(Document)
        repository: Repository<Document>,
    ) {
        super(repository);
    }
}
