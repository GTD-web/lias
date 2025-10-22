import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainApprovalLineTemplateVersionRepository } from './approval-line-template-version.repository';
import { BaseService } from '../../../common/services/base.service';
import { ApprovalLineTemplateVersion } from './approval-line-template-version.entity';

@Injectable()
export class DomainApprovalLineTemplateVersionService extends BaseService<ApprovalLineTemplateVersion> {
    constructor(private readonly approvalLineTemplateVersionRepository: DomainApprovalLineTemplateVersionRepository) {
        super(approvalLineTemplateVersionRepository);
    }

    async findByVersionId(id: string): Promise<ApprovalLineTemplateVersion> {
        const version = await this.approvalLineTemplateVersionRepository.findOne({
            where: { id },
            relations: ['steps'],
        });
        if (!version) {
            throw new NotFoundException('결재선 템플릿 버전을 찾을 수 없습니다.');
        }
        return version;
    }

    async findByTemplateId(templateId: string): Promise<ApprovalLineTemplateVersion[]> {
        return this.approvalLineTemplateVersionRepository.findByTemplateId(templateId);
    }

    async findActiveVersion(templateId: string): Promise<ApprovalLineTemplateVersion> {
        const version = await this.approvalLineTemplateVersionRepository.findActiveVersion(templateId);
        if (!version) {
            throw new NotFoundException('활성 버전을 찾을 수 없습니다.');
        }
        return version;
    }

    async findByTemplateIdAndVersionNo(templateId: string, versionNo: number): Promise<ApprovalLineTemplateVersion> {
        const version = await this.approvalLineTemplateVersionRepository.findByTemplateIdAndVersionNo(
            templateId,
            versionNo,
        );
        if (!version) {
            throw new NotFoundException('결재선 템플릿 버전을 찾을 수 없습니다.');
        }
        return version;
    }
}
