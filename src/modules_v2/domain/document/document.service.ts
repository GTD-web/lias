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

    async findByDocumentId(id: string): Promise<Document> {
        const document = await this.documentRepository.findOne({
            where: { id },
            relations: ['formVersion', 'drafter', 'approvalLineSnapshot'],
        });
        if (!document) {
            throw new NotFoundException('문서를 찾을 수 없습니다.');
        }
        return document;
    }

    async findByDocumentNumber(documentNumber: string): Promise<Document> {
        const document = await this.documentRepository.findByDocumentNumber(documentNumber);
        if (!document) {
            throw new NotFoundException('문서를 찾을 수 없습니다.');
        }
        return document;
    }

    async findByDrafterId(drafterId: string): Promise<Document[]> {
        return this.documentRepository.findByDrafterId(drafterId);
    }

    async findByStatus(status: DocumentStatus): Promise<Document[]> {
        return this.documentRepository.findByStatus(status);
    }

    async findByDrafterIdAndStatus(drafterId: string, status: DocumentStatus): Promise<Document[]> {
        return this.documentRepository.findByDrafterIdAndStatus(drafterId, status);
    }
}
