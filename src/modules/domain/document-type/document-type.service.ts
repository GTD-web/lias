import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainDocumentTypeRepository } from './document-type.repository';
import { BaseService } from '../../../common/services/base.service';
import { DocumentType } from '../../../database/entities';

@Injectable()
export class DomainDocumentTypeService extends BaseService<DocumentType> {
    constructor(private readonly documentTypeRepository: DomainDocumentTypeRepository) {
        super(documentTypeRepository);
    }
}
