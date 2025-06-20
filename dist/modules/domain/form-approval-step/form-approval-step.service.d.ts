import { DomainFormApprovalStepRepository } from './form-approval-step.repository';
import { BaseService } from '../../../common/services/base.service';
import { FormApprovalStep } from '../../../database/entities';
import { IRepositoryOptions } from 'src/common/interfaces/repository.interface';
export declare class DomainFormApprovalStepService extends BaseService<FormApprovalStep> {
    private readonly formApprovalStepRepository;
    constructor(formApprovalStepRepository: DomainFormApprovalStepRepository);
    deleteByFormApprovalLineId(formApprovalLineId: string, repositoryOptions?: IRepositoryOptions<FormApprovalStep>): Promise<void>;
}
