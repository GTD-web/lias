import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainApprovalStepTemplateRepository } from './approval-step-template.repository';
import { BaseService } from '../../../common/services/base.service';
import { ApprovalStepTemplate } from './approval-step-template.entity';

@Injectable()
export class DomainApprovalStepTemplateService extends BaseService<ApprovalStepTemplate> {
    constructor(private readonly approvalStepTemplateRepository: DomainApprovalStepTemplateRepository) {
        super(approvalStepTemplateRepository);
    }

    async findByStepTemplateId(id: string): Promise<ApprovalStepTemplate> {
        const stepTemplate = await this.approvalStepTemplateRepository.findOne({
            where: { id },
            relations: ['defaultApprover', 'targetDepartment', 'targetPosition'],
        });
        if (!stepTemplate) {
            throw new NotFoundException('결재 단계 템플릿을 찾을 수 없습니다.');
        }
        return stepTemplate;
    }

    async findByLineTemplateVersionId(lineTemplateVersionId: string): Promise<ApprovalStepTemplate[]> {
        return this.approvalStepTemplateRepository.findByLineTemplateVersionId(lineTemplateVersionId);
    }
}
