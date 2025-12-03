import { DomainApprovalStepSnapshotRepository } from './approval-step-snapshot.repository';
import { BaseService } from '../../../common/services/base.service';
import { ApprovalStepSnapshot } from './approval-step-snapshot.entity';
import { DeepPartial, QueryRunner } from 'typeorm';
export declare class DomainApprovalStepSnapshotService extends BaseService<ApprovalStepSnapshot> {
    private readonly approvalStepSnapshotRepository;
    constructor(approvalStepSnapshotRepository: DomainApprovalStepSnapshotRepository);
    createApprovalStepSnapshot(dto: DeepPartial<ApprovalStepSnapshot>, queryRunner?: QueryRunner): Promise<ApprovalStepSnapshot>;
    updateApprovalStepSnapshot(snapshot: ApprovalStepSnapshot, dto: DeepPartial<ApprovalStepSnapshot>, queryRunner?: QueryRunner): Promise<ApprovalStepSnapshot>;
    approveApprovalStepSnapshot(snapshot: ApprovalStepSnapshot, queryRunner?: QueryRunner): Promise<ApprovalStepSnapshot>;
    rejectApprovalStepSnapshot(snapshot: ApprovalStepSnapshot, queryRunner?: QueryRunner): Promise<ApprovalStepSnapshot>;
    cancelApprovalStepSnapshot(snapshot: ApprovalStepSnapshot, queryRunner?: QueryRunner): Promise<ApprovalStepSnapshot>;
}
