import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainDocumentRepository } from './document.repository';
import { BaseService } from '../../../common/services/base.service';
import { Document } from './document.entity';
import { DocumentStatus } from '../../../common/enums/approval.enum';

@Injectable()
export class DomainDocumentService extends BaseService<Document> {
    constructor(private readonly documentRepository: DomainDocumentRepository) {
        super(documentRepository);
    }
}
