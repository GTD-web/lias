import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainApprovalLineTemplateRepository } from './approval-line-template.repository';
import { BaseService } from '../../../common/services/base.service';
import { ApprovalLineTemplate } from './approval-line-template.entity';
import { ApprovalLineType, ApprovalLineTemplateStatus } from '../../../common/enums/approval.enum';

@Injectable()
export class DomainApprovalLineTemplateService extends BaseService<ApprovalLineTemplate> {
    constructor(private readonly approvalLineTemplateRepository: DomainApprovalLineTemplateRepository) {
        super(approvalLineTemplateRepository);
    }

    async findByTemplateId(id: string): Promise<ApprovalLineTemplate> {
        const template = await this.approvalLineTemplateRepository.findOne({ where: { id } });
        if (!template) {
            throw new NotFoundException('결재선 템플릿을 찾을 수 없습니다.');
        }
        return template;
    }

    async findByStatus(status: ApprovalLineTemplateStatus): Promise<ApprovalLineTemplate[]> {
        return this.approvalLineTemplateRepository.findByStatus(status);
    }

    async findByType(type: ApprovalLineType): Promise<ApprovalLineTemplate[]> {
        return this.approvalLineTemplateRepository.findByType(type);
    }

    async findByDepartmentId(departmentId: string): Promise<ApprovalLineTemplate[]> {
        return this.approvalLineTemplateRepository.findByDepartmentId(departmentId);
    }
}
