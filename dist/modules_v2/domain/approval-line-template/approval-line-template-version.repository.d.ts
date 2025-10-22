import { Repository } from 'typeorm';
import { ApprovalLineTemplateVersion } from './approval-line-template-version.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';
export declare class DomainApprovalLineTemplateVersionRepository extends BaseRepository<ApprovalLineTemplateVersion> {
    constructor(repository: Repository<ApprovalLineTemplateVersion>);
    findByTemplateId(templateId: string): Promise<ApprovalLineTemplateVersion[]>;
    findActiveVersion(templateId: string): Promise<ApprovalLineTemplateVersion | null>;
    findByTemplateIdAndVersionNo(templateId: string, versionNo: number): Promise<ApprovalLineTemplateVersion | null>;
}
