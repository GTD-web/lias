import { Repository } from 'typeorm';
import { ApprovalStepTemplate } from './approval-step-template.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';
export declare class DomainApprovalStepTemplateRepository extends BaseRepository<ApprovalStepTemplate> {
    constructor(repository: Repository<ApprovalStepTemplate>);
    findByLineTemplateVersionId(lineTemplateVersionId: string): Promise<ApprovalStepTemplate[]>;
}
