import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApprovalLineSnapshot } from './approval-line-snapshot.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';

@Injectable()
export class DomainApprovalLineSnapshotRepository extends BaseRepository<ApprovalLineSnapshot> {
    constructor(
        @InjectRepository(ApprovalLineSnapshot)
        repository: Repository<ApprovalLineSnapshot>,
    ) {
        super(repository);
    }

    async findByDocumentId(documentId: string): Promise<ApprovalLineSnapshot | null> {
        return this.repository.findOne({
            where: { documentId },
            relations: ['steps', 'steps.approver'],
        });
    }

    async findBySourceTemplateVersionId(sourceTemplateVersionId: string): Promise<ApprovalLineSnapshot[]> {
        return this.repository.find({
            where: { sourceTemplateVersionId },
            order: { createdAt: 'DESC' },
        });
    }
}
