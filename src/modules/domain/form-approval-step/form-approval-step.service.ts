import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainFormApprovalStepRepository } from './form-approval-step.repository';
import { BaseService } from '../../../common/services/base.service';
import { FormApprovalStep } from '../../../database/entities';
import { IRepositoryOptions } from 'src/common/interfaces/repository.interface';

@Injectable()
export class DomainFormApprovalStepService extends BaseService<FormApprovalStep> {
    constructor(private readonly formApprovalStepRepository: DomainFormApprovalStepRepository) {
        super(formApprovalStepRepository);
    }

    async deleteByFormApprovalLineId(
        formApprovalLineId: string,
        repositoryOptions?: IRepositoryOptions<FormApprovalStep>,
    ): Promise<void> {
        await this.formApprovalStepRepository.deleteByFormApprovalLineId(formApprovalLineId, repositoryOptions);
    }
}
