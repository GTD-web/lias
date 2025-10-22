import { DomainApprovalStepSnapshotRepository } from './approval-step-snapshot.repository';
import { BaseService } from '../../../common/services/base.service';
import { ApprovalStepSnapshot } from './approval-step-snapshot.entity';
import { ApprovalStatus } from '../../../common/enums/approval.enum';
export declare class DomainApprovalStepSnapshotService extends BaseService<ApprovalStepSnapshot> {
    private readonly approvalStepSnapshotRepository;
    constructor(approvalStepSnapshotRepository: DomainApprovalStepSnapshotRepository);
    findByStepSnapshotId(id: string): Promise<ApprovalStepSnapshot>;
    findBySnapshotId(snapshotId: string): Promise<ApprovalStepSnapshot[]>;
    findByApproverId(approverId: string): Promise<ApprovalStepSnapshot[]>;
    findByApproverIdAndStatus(approverId: string, status: ApprovalStatus): Promise<ApprovalStepSnapshot[]>;
}
