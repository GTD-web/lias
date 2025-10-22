import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { DocumentStatus } from '../../../common/enums/approval.enum';

@Injectable()
export class DomainDocumentRepository extends BaseRepository<Document> {
    constructor(
        @InjectRepository(Document)
        repository: Repository<Document>,
    ) {
        super(repository);
    }

    async findByDocumentNumber(documentNumber: string): Promise<Document | null> {
        return this.repository.findOne({
            where: { documentNumber },
            relations: ['formVersion', 'drafter', 'approvalLineSnapshot'],
        });
    }

    async findByDrafterId(drafterId: string): Promise<Document[]> {
        return this.repository.find({
            where: { drafterId },
            order: { createdAt: 'DESC' },
        });
    }

    async findByStatus(status: DocumentStatus): Promise<Document[]> {
        return this.repository.find({
            where: { status },
            order: { createdAt: 'DESC' },
        });
    }

    async findByDrafterIdAndStatus(drafterId: string, status: DocumentStatus): Promise<Document[]> {
        return this.repository.find({
            where: { drafterId, status },
            order: { createdAt: 'DESC' },
        });
    }
}
