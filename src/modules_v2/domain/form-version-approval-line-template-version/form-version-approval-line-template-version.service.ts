import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainFormVersionApprovalLineTemplateVersionRepository } from './form-version-approval-line-template-version.repository';
import { BaseService } from '../../../common/services/base.service';
import { FormVersionApprovalLineTemplateVersion } from './form-version-approval-line-template-version.entity';

@Injectable()
export class DomainFormVersionApprovalLineTemplateVersionService extends BaseService<FormVersionApprovalLineTemplateVersion> {
    constructor(
        private readonly formVersionApprovalLineTemplateVersionRepository: DomainFormVersionApprovalLineTemplateVersionRepository,
    ) {
        super(formVersionApprovalLineTemplateVersionRepository);
    }

    async findByMappingId(id: string): Promise<FormVersionApprovalLineTemplateVersion> {
        const mapping = await this.formVersionApprovalLineTemplateVersionRepository.findOne({
            where: { id },
            relations: ['formVersion', 'approvalLineTemplateVersion'],
        });
        if (!mapping) {
            throw new NotFoundException('매핑 정보를 찾을 수 없습니다.');
        }
        return mapping;
    }

    async findByFormVersionId(formVersionId: string): Promise<FormVersionApprovalLineTemplateVersion[]> {
        return this.formVersionApprovalLineTemplateVersionRepository.findByFormVersionId(formVersionId);
    }

    async findByApprovalLineTemplateVersionId(
        approvalLineTemplateVersionId: string,
    ): Promise<FormVersionApprovalLineTemplateVersion[]> {
        return this.formVersionApprovalLineTemplateVersionRepository.findByApprovalLineTemplateVersionId(
            approvalLineTemplateVersionId,
        );
    }

    async findDefaultByFormVersionId(formVersionId: string): Promise<FormVersionApprovalLineTemplateVersion> {
        const mapping =
            await this.formVersionApprovalLineTemplateVersionRepository.findDefaultByFormVersionId(formVersionId);
        if (!mapping) {
            throw new NotFoundException('기본 결재선을 찾을 수 없습니다.');
        }
        return mapping;
    }
}
