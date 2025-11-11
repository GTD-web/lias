import { DomainDocumentTemplateRepository } from './document-template.repository';
import { BaseService } from '../../../common/services/base.service';
import { DocumentTemplate } from './document-template.entity';
export declare class DomainDocumentTemplateService extends BaseService<DocumentTemplate> {
    private readonly documentTemplateRepository;
    constructor(documentTemplateRepository: DomainDocumentTemplateRepository);
}
