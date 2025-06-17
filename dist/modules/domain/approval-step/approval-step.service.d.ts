import { DomainApprovalStepRepository } from './approval-step.repository';
import { BaseService } from '../../../common/services/base.service';
import { ApprovalStep } from '../../../database/entities';
export declare class DomainApprovalStepService extends BaseService<ApprovalStep> {
    private readonly approvalStepRepository;
    constructor(approvalStepRepository: DomainApprovalStepRepository);
}
