import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainApprovalStepSnapshotRepository } from './approval-step-snapshot.repository';
import { BaseService } from '../../../common/services/base.service';
import { ApprovalStepSnapshot } from './approval-step-snapshot.entity';
import { ApprovalStatus } from '../../../common/enums/approval.enum';

@Injectable()
export class DomainApprovalStepSnapshotService extends BaseService<ApprovalStepSnapshot> {
    constructor(private readonly approvalStepSnapshotRepository: DomainApprovalStepSnapshotRepository) {
        super(approvalStepSnapshotRepository);
    }

    async findByStepSnapshotId(id: string): Promise<ApprovalStepSnapshot> {
        const stepSnapshot = await this.approvalStepSnapshotRepository.findOne({
            where: { id },
            relations: ['approver', 'approverDepartment', 'approverPosition'],
        });
        if (!stepSnapshot) {
            throw new NotFoundException('결재 단계 스냅샷을 찾을 수 없습니다.');
        }
        return stepSnapshot;
    }

    async findBySnapshotId(snapshotId: string): Promise<ApprovalStepSnapshot[]> {
        return this.approvalStepSnapshotRepository.findBySnapshotId(snapshotId);
    }

    async findByApproverId(approverId: string): Promise<ApprovalStepSnapshot[]> {
        return this.approvalStepSnapshotRepository.findByApproverId(approverId);
    }

    async findByApproverIdAndStatus(approverId: string, status: ApprovalStatus): Promise<ApprovalStepSnapshot[]> {
        return this.approvalStepSnapshotRepository.findByApproverIdAndStatus(approverId, status);
    }
}
