import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainDocumentFormRepository } from './document-form.repository';
import { BaseService } from '../../../common/services/base.service';
import { DocumentForm } from '../../../database/entities';

@Injectable()
export class DomainDocumentFormService extends BaseService<DocumentForm> {
    constructor(private readonly documentFormRepository: DomainDocumentFormRepository) {
        super(documentFormRepository);
    }
}
