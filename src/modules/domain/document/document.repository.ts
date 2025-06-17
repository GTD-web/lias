import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '../../../database/entities';
import { BaseRepository } from '../../../common/repositories/base.repository';

@Injectable()
export class DomainDocumentRepository extends BaseRepository<Document> {
    constructor(
        @InjectRepository(Document)
        repository: Repository<Document>,
    ) {
        super(repository);
    }
}
