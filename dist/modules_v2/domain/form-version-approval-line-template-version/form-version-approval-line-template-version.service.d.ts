import { DomainFormVersionApprovalLineTemplateVersionRepository } from './form-version-approval-line-template-version.repository';
import { BaseService } from '../../../common/services/base.service';
import { FormVersionApprovalLineTemplateVersion } from './form-version-approval-line-template-version.entity';
export declare class DomainFormVersionApprovalLineTemplateVersionService extends BaseService<FormVersionApprovalLineTemplateVersion> {
    private readonly formVersionApprovalLineTemplateVersionRepository;
    constructor(formVersionApprovalLineTemplateVersionRepository: DomainFormVersionApprovalLineTemplateVersionRepository);
    findByMappingId(id: string): Promise<FormVersionApprovalLineTemplateVersion>;
    findByFormVersionId(formVersionId: string): Promise<FormVersionApprovalLineTemplateVersion[]>;
    findByApprovalLineTemplateVersionId(approvalLineTemplateVersionId: string): Promise<FormVersionApprovalLineTemplateVersion[]>;
    findDefaultByFormVersionId(formVersionId: string): Promise<FormVersionApprovalLineTemplateVersion>;
}
