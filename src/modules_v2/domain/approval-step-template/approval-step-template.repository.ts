import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApprovalStepTemplate } from './approval-step-template.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';

@Injectable()
export class DomainApprovalStepTemplateRepository extends BaseRepository<ApprovalStepTemplate> {
    constructor(
        @InjectRepository(ApprovalStepTemplate)
        repository: Repository<ApprovalStepTemplate>,
    ) {
        super(repository);
    }

    async findByLineTemplateVersionId(lineTemplateVersionId: string): Promise<ApprovalStepTemplate[]> {
        return this.repository.find({
            where: { lineTemplateVersionId },
            order: { stepOrder: 'ASC' },
            relations: ['defaultApprover', 'targetDepartment', 'targetPosition'],
        });
    }
}
