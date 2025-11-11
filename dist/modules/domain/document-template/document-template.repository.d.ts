import { Repository } from 'typeorm';
import { DocumentTemplate } from './document-template.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';
export declare class DomainDocumentTemplateRepository extends BaseRepository<DocumentTemplate> {
    constructor(repository: Repository<DocumentTemplate>);
}
