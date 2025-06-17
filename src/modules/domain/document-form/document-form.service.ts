import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainDocumentFormRepository } from './document-form.repository';
import { BaseService } from '../../../common/services/base.service';
import { DocumentForm } from '../../../database/entities';

@Injectable()
export class DomainDocumentFormService extends BaseService<DocumentForm> {
    constructor(private readonly documentFormRepository: DomainDocumentFormRepository) {
        super(documentFormRepository);
    }

    async findByDocumentFormId(documentFormId: string): Promise<DocumentForm> {
        const documentForm = await this.documentFormRepository.findOne({
            where: { documentFormId },
        });
        if (!documentForm) {
            throw new NotFoundException('문서 양식을 찾을 수 없습니다.');
        }
        return documentForm;
    }

    async findByType(type: string): Promise<DocumentForm[]> {
        return this.documentFormRepository.find({
            where: { type },
        });
    }
}
