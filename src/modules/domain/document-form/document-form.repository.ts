import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentForm } from '../../../database/entities';
import { BaseRepository } from '../../../common/repositories/base.repository';

@Injectable()
export class DomainDocumentFormRepository extends BaseRepository<DocumentForm> {
    constructor(
        @InjectRepository(DocumentForm)
        repository: Repository<DocumentForm>,
    ) {
        super(repository);
    }
}
