import { DomainApprovalLineTemplateVersionRepository } from './approval-line-template-version.repository';
import { BaseService } from '../../../common/services/base.service';
import { ApprovalLineTemplateVersion } from './approval-line-template-version.entity';
export declare class DomainApprovalLineTemplateVersionService extends BaseService<ApprovalLineTemplateVersion> {
    private readonly approvalLineTemplateVersionRepository;
    constructor(approvalLineTemplateVersionRepository: DomainApprovalLineTemplateVersionRepository);
    findByVersionId(id: string): Promise<ApprovalLineTemplateVersion>;
    findByTemplateId(templateId: string): Promise<ApprovalLineTemplateVersion[]>;
    findActiveVersion(templateId: string): Promise<ApprovalLineTemplateVersion>;
    findByTemplateIdAndVersionNo(templateId: string, versionNo: number): Promise<ApprovalLineTemplateVersion>;
}
