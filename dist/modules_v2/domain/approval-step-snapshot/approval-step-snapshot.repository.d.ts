import { Repository } from 'typeorm';
import { ApprovalStepSnapshot } from './approval-step-snapshot.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { ApprovalStatus } from '../../../common/enums/approval.enum';
export declare class DomainApprovalStepSnapshotRepository extends BaseRepository<ApprovalStepSnapshot> {
    constructor(repository: Repository<ApprovalStepSnapshot>);
    findBySnapshotId(snapshotId: string): Promise<ApprovalStepSnapshot[]>;
    findByApproverId(approverId: string): Promise<ApprovalStepSnapshot[]>;
    findByApproverIdAndStatus(approverId: string, status: ApprovalStatus): Promise<ApprovalStepSnapshot[]>;
}
