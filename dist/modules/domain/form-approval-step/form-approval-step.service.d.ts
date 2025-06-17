import { DomainFormApprovalStepRepository } from './form-approval-step.repository';
import { BaseService } from '../../../common/services/base.service';
import { FormApprovalStep } from '../../../database/entities';
export declare class DomainFormApprovalStepService extends BaseService<FormApprovalStep> {
    private readonly formApprovalStepRepository;
    constructor(formApprovalStepRepository: DomainFormApprovalStepRepository);
}
