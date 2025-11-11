import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainDocumentTemplateRepository } from './document-template.repository';
import { BaseService } from '../../../common/services/base.service';
import { DocumentTemplate } from './document-template.entity';
import { DocumentTemplateStatus } from '../../../common/enums/approval.enum';

@Injectable()
export class DomainDocumentTemplateService extends BaseService<DocumentTemplate> {
    constructor(private readonly documentTemplateRepository: DomainDocumentTemplateRepository) {
        super(documentTemplateRepository);
    }
}
