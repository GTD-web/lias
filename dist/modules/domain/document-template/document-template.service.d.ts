import { QueryRunner } from 'typeorm';
import { DomainDocumentTemplateRepository } from './document-template.repository';
import { BaseService } from '../../../common/services/base.service';
import { DocumentTemplate } from './document-template.entity';
import { DocumentTemplateStatus } from '../../../common/enums/approval.enum';
export declare class DomainDocumentTemplateService extends BaseService<DocumentTemplate> {
    private readonly documentTemplateRepository;
    constructor(documentTemplateRepository: DomainDocumentTemplateRepository);
    createDocumentTemplate(params: {
        name: string;
        code: string;
        description?: string;
        template: string;
        status?: DocumentTemplateStatus;
        categoryId?: string;
    }, queryRunner?: QueryRunner): Promise<DocumentTemplate>;
    updateDocumentTemplate(documentTemplate: DocumentTemplate, params: {
        name?: string;
        code?: string;
        description?: string;
        template?: string;
        status?: DocumentTemplateStatus;
        categoryId?: string;
    }, queryRunner?: QueryRunner): Promise<DocumentTemplate>;
}
