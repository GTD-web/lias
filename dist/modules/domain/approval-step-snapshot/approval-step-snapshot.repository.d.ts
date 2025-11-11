import { Repository } from 'typeorm';
import { ApprovalStepSnapshot } from './approval-step-snapshot.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';
export declare class DomainApprovalStepSnapshotRepository extends BaseRepository<ApprovalStepSnapshot> {
    constructor(repository: Repository<ApprovalStepSnapshot>);
}
