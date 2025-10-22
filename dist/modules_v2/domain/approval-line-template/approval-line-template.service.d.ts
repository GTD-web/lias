import { DomainApprovalLineTemplateRepository } from './approval-line-template.repository';
import { BaseService } from '../../../common/services/base.service';
import { ApprovalLineTemplate } from './approval-line-template.entity';
import { ApprovalLineType, ApprovalLineTemplateStatus } from '../../../common/enums/approval.enum';
export declare class DomainApprovalLineTemplateService extends BaseService<ApprovalLineTemplate> {
    private readonly approvalLineTemplateRepository;
    constructor(approvalLineTemplateRepository: DomainApprovalLineTemplateRepository);
    findByTemplateId(id: string): Promise<ApprovalLineTemplate>;
    findByStatus(status: ApprovalLineTemplateStatus): Promise<ApprovalLineTemplate[]>;
    findByType(type: ApprovalLineType): Promise<ApprovalLineTemplate[]>;
    findByDepartmentId(departmentId: string): Promise<ApprovalLineTemplate[]>;
}
