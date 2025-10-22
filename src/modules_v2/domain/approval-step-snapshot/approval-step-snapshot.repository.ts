import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApprovalStepSnapshot } from './approval-step-snapshot.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { ApprovalStatus } from '../../../common/enums/approval.enum';

@Injectable()
export class DomainApprovalStepSnapshotRepository extends BaseRepository<ApprovalStepSnapshot> {
    constructor(
        @InjectRepository(ApprovalStepSnapshot)
        repository: Repository<ApprovalStepSnapshot>,
    ) {
        super(repository);
    }

    async findBySnapshotId(snapshotId: string): Promise<ApprovalStepSnapshot[]> {
        return this.repository.find({
            where: { snapshotId },
            order: { stepOrder: 'ASC' },
            relations: ['approver', 'approverDepartment', 'approverPosition'],
        });
    }

    async findByApproverId(approverId: string): Promise<ApprovalStepSnapshot[]> {
        return this.repository.find({
            where: { approverId },
            order: { createdAt: 'DESC' },
            relations: ['snapshot'],
        });
    }

    async findByApproverIdAndStatus(approverId: string, status: ApprovalStatus): Promise<ApprovalStepSnapshot[]> {
        return this.repository.find({
            where: { approverId, status },
            order: { createdAt: 'DESC' },
            relations: ['snapshot'],
        });
    }
}
