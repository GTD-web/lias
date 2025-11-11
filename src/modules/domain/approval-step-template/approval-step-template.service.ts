import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainApprovalStepTemplateRepository } from './approval-step-template.repository';
import { BaseService } from '../../../common/services/base.service';
import { ApprovalStepTemplate } from './approval-step-template.entity';

@Injectable()
export class DomainApprovalStepTemplateService extends BaseService<ApprovalStepTemplate> {
    constructor(private readonly approvalStepTemplateRepository: DomainApprovalStepTemplateRepository) {
        super(approvalStepTemplateRepository);
    }
}
