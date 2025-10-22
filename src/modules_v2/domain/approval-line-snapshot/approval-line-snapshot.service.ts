import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainApprovalLineSnapshotRepository } from './approval-line-snapshot.repository';
import { BaseService } from '../../../common/services/base.service';
import { ApprovalLineSnapshot } from './approval-line-snapshot.entity';

@Injectable()
export class DomainApprovalLineSnapshotService extends BaseService<ApprovalLineSnapshot> {
    constructor(private readonly approvalLineSnapshotRepository: DomainApprovalLineSnapshotRepository) {
        super(approvalLineSnapshotRepository);
    }

    async findBySnapshotId(id: string): Promise<ApprovalLineSnapshot> {
        const snapshot = await this.approvalLineSnapshotRepository.findOne({
            where: { id },
            relations: ['steps', 'steps.approver'],
        });
        if (!snapshot) {
            throw new NotFoundException('결재선 스냅샷을 찾을 수 없습니다.');
        }
        return snapshot;
    }

    async findByDocumentId(documentId: string): Promise<ApprovalLineSnapshot> {
        const snapshot = await this.approvalLineSnapshotRepository.findByDocumentId(documentId);
        if (!snapshot) {
            throw new NotFoundException('결재선 스냅샷을 찾을 수 없습니다.');
        }
        return snapshot;
    }

    async findBySourceTemplateVersionId(sourceTemplateVersionId: string): Promise<ApprovalLineSnapshot[]> {
        return this.approvalLineSnapshotRepository.findBySourceTemplateVersionId(sourceTemplateVersionId);
    }
}
