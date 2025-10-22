import { Repository } from 'typeorm';
import { FormVersionApprovalLineTemplateVersion } from './form-version-approval-line-template-version.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';
export declare class DomainFormVersionApprovalLineTemplateVersionRepository extends BaseRepository<FormVersionApprovalLineTemplateVersion> {
    constructor(repository: Repository<FormVersionApprovalLineTemplateVersion>);
    findByFormVersionId(formVersionId: string): Promise<FormVersionApprovalLineTemplateVersion[]>;
    findByApprovalLineTemplateVersionId(approvalLineTemplateVersionId: string): Promise<FormVersionApprovalLineTemplateVersion[]>;
    findDefaultByFormVersionId(formVersionId: string): Promise<FormVersionApprovalLineTemplateVersion | null>;
}
