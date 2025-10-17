import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainDocumentRepository } from './document.repository';
import { BaseService } from '../../../common/services/base.service';
import { Document } from '../../../database/entities';
import { QueryRunner, SelectQueryBuilder } from 'typeorm';
import { ApprovalStatus } from 'src/common/enums/approval.enum';

@Injectable()
export class DomainDocumentService extends BaseService<Document> {
    constructor(private readonly documentRepository: DomainDocumentRepository) {
        super(documentRepository);
    }

    createQueryBuilder(alias: string): SelectQueryBuilder<Document> {
        return this.documentRepository['repository'].createQueryBuilder(alias);
    }

    async approve(id: string, queryRunner?: QueryRunner): Promise<Document> {
        return await this.documentRepository.update(id, { status: ApprovalStatus.APPROVED }, { queryRunner });
    }

    async reject(id: string, queryRunner?: QueryRunner): Promise<Document> {
        return await this.documentRepository.update(id, { status: ApprovalStatus.REJECTED }, { queryRunner });
    }
}
