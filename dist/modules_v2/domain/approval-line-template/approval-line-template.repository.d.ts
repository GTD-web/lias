import { Repository } from 'typeorm';
import { ApprovalLineTemplate } from './approval-line-template.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { ApprovalLineType, ApprovalLineTemplateStatus } from '../../../common/enums/approval.enum';
export declare class DomainApprovalLineTemplateRepository extends BaseRepository<ApprovalLineTemplate> {
    constructor(repository: Repository<ApprovalLineTemplate>);
    findByStatus(status: ApprovalLineTemplateStatus): Promise<ApprovalLineTemplate[]>;
    findByType(type: ApprovalLineType): Promise<ApprovalLineTemplate[]>;
    findByDepartmentId(departmentId: string): Promise<ApprovalLineTemplate[]>;
}
