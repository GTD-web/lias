import { DomainApprovalStepSnapshotRepository } from './approval-step-snapshot.repository';
import { BaseService } from '../../../common/services/base.service';
import { ApprovalStepSnapshot } from './approval-step-snapshot.entity';
export declare class DomainApprovalStepSnapshotService extends BaseService<ApprovalStepSnapshot> {
    private readonly approvalStepSnapshotRepository;
    constructor(approvalStepSnapshotRepository: DomainApprovalStepSnapshotRepository);
}
