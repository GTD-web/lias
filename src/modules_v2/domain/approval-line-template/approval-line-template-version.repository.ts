import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApprovalLineTemplateVersion } from './approval-line-template-version.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';

@Injectable()
export class DomainApprovalLineTemplateVersionRepository extends BaseRepository<ApprovalLineTemplateVersion> {
    constructor(
        @InjectRepository(ApprovalLineTemplateVersion)
        repository: Repository<ApprovalLineTemplateVersion>,
    ) {
        super(repository);
    }

    async findByTemplateId(templateId: string): Promise<ApprovalLineTemplateVersion[]> {
        return this.repository.find({
            where: { templateId },
            relations: ['steps'],
            order: { versionNo: 'DESC' },
        });
    }

    async findActiveVersion(templateId: string): Promise<ApprovalLineTemplateVersion | null> {
        return this.repository.findOne({
            where: { templateId, isActive: true },
            relations: ['steps'],
        });
    }

    async findByTemplateIdAndVersionNo(
        templateId: string,
        versionNo: number,
    ): Promise<ApprovalLineTemplateVersion | null> {
        return this.repository.findOne({
            where: { templateId, versionNo },
            relations: ['steps'],
        });
    }
}
