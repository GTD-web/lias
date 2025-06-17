import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainApprovalStepRepository } from './approval-step.repository';
import { BaseService } from '../../../common/services/base.service';
import { ApprovalStep } from '../../../database/entities';

@Injectable()
export class DomainApprovalStepService extends BaseService<ApprovalStep> {
    constructor(private readonly approvalStepRepository: DomainApprovalStepRepository) {
        super(approvalStepRepository);
    }
}
