import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainFormApprovalStepRepository } from './form-approval-step.repository';
import { BaseService } from '../../../common/services/base.service';
import { FormApprovalStep } from '../../../database/entities';

@Injectable()
export class DomainFormApprovalStepService extends BaseService<FormApprovalStep> {
    constructor(private readonly formApprovalStepRepository: DomainFormApprovalStepRepository) {
        super(formApprovalStepRepository);
    }
}
