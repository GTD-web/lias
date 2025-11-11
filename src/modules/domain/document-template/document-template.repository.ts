import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentTemplate } from './document-template.entity';
import { DocumentTemplateStatus } from '../../../common/enums/approval.enum';
import { BaseRepository } from '../../../common/repositories/base.repository';

@Injectable()
export class DomainDocumentTemplateRepository extends BaseRepository<DocumentTemplate> {
    constructor(
        @InjectRepository(DocumentTemplate)
        repository: Repository<DocumentTemplate>,
    ) {
        super(repository);
    }
}
