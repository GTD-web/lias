import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { DomainDocumentTemplateRepository } from './document-template.repository';
import { BaseService } from '../../../common/services/base.service';
import { DocumentTemplate } from './document-template.entity';
import { DocumentTemplateStatus } from '../../../common/enums/approval.enum';

@Injectable()
export class DomainDocumentTemplateService extends BaseService<DocumentTemplate> {
    constructor(private readonly documentTemplateRepository: DomainDocumentTemplateRepository) {
        super(documentTemplateRepository);
    }

    /**
     * 문서 템플릿을 생성한다
     */
    async createDocumentTemplate(
        params: {
            name: string;
            code: string;
            description?: string;
            template: string;
            status?: DocumentTemplateStatus;
            categoryId?: string;
        },
        queryRunner?: QueryRunner,
    ): Promise<DocumentTemplate> {
        const documentTemplate = new DocumentTemplate();

        documentTemplate.이름을설정한다(params.name);
        documentTemplate.코드를설정한다(params.code);
        documentTemplate.템플릿을설정한다(params.template);

        if (params.description) {
            documentTemplate.설명을설정한다(params.description);
        }
        if (params.categoryId) {
            documentTemplate.카테고리를설정한다(params.categoryId);
        }
        if (params.status) {
            documentTemplate.상태를설정한다(params.status);
        }

        return await this.documentTemplateRepository.save(documentTemplate, { queryRunner });
    }

    /**
     * 문서 템플릿을 수정한다
     */
    async updateDocumentTemplate(
        documentTemplate: DocumentTemplate,
        params: {
            name?: string;
            code?: string;
            description?: string;
            template?: string;
            status?: DocumentTemplateStatus;
            categoryId?: string;
        },
        queryRunner?: QueryRunner,
    ): Promise<DocumentTemplate> {
        if (params.name) {
            documentTemplate.이름을설정한다(params.name);
        }
        if (params.code) {
            documentTemplate.코드를설정한다(params.code);
        }
        if (params.description !== undefined) {
            documentTemplate.설명을설정한다(params.description);
        }
        if (params.template) {
            documentTemplate.템플릿을설정한다(params.template);
        }
        if (params.categoryId !== undefined) {
            documentTemplate.카테고리를설정한다(params.categoryId);
        }
        if (params.status) {
            documentTemplate.상태를설정한다(params.status);
        }

        return await this.documentTemplateRepository.save(documentTemplate, { queryRunner });
    }
}
