import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormVersionApprovalLineTemplateVersion } from './form-version-approval-line-template-version.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';

@Injectable()
export class DomainFormVersionApprovalLineTemplateVersionRepository extends BaseRepository<FormVersionApprovalLineTemplateVersion> {
    constructor(
        @InjectRepository(FormVersionApprovalLineTemplateVersion)
        repository: Repository<FormVersionApprovalLineTemplateVersion>,
    ) {
        super(repository);
    }

    async findByFormVersionId(formVersionId: string): Promise<FormVersionApprovalLineTemplateVersion[]> {
        return this.repository.find({
            where: { formVersionId },
            relations: ['approvalLineTemplateVersion'],
            order: { displayOrder: 'ASC' },
        });
    }

    async findByApprovalLineTemplateVersionId(
        approvalLineTemplateVersionId: string,
    ): Promise<FormVersionApprovalLineTemplateVersion[]> {
        return this.repository.find({
            where: { approvalLineTemplateVersionId },
            relations: ['formVersion'],
        });
    }

    async findDefaultByFormVersionId(formVersionId: string): Promise<FormVersionApprovalLineTemplateVersion | null> {
        return this.repository.findOne({
            where: { formVersionId, isDefault: true },
            relations: ['approvalLineTemplateVersion'],
        });
    }
}
