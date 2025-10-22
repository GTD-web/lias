import { DomainApprovalStepTemplateRepository } from './approval-step-template.repository';
import { BaseService } from '../../../common/services/base.service';
import { ApprovalStepTemplate } from './approval-step-template.entity';
export declare class DomainApprovalStepTemplateService extends BaseService<ApprovalStepTemplate> {
    private readonly approvalStepTemplateRepository;
    constructor(approvalStepTemplateRepository: DomainApprovalStepTemplateRepository);
    findByStepTemplateId(id: string): Promise<ApprovalStepTemplate>;
    findByLineTemplateVersionId(lineTemplateVersionId: string): Promise<ApprovalStepTemplate[]>;
}
