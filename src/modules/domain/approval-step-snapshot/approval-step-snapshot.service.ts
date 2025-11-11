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
}
