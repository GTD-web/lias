import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentType } from '../../../database/entities';
import { BaseRepository } from '../../../common/repositories/base.repository';

@Injectable()
export class DomainDocumentTypeRepository extends BaseRepository<DocumentType> {
    constructor(
        @InjectRepository(DocumentType)
        repository: Repository<DocumentType>,
    ) {
        super(repository);
    }
}
