import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApprovalLineTemplate } from './approval-line-template.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { ApprovalLineType, ApprovalLineTemplateStatus } from '../../../common/enums/approval.enum';

@Injectable()
export class DomainApprovalLineTemplateRepository extends BaseRepository<ApprovalLineTemplate> {
    constructor(
        @InjectRepository(ApprovalLineTemplate)
        repository: Repository<ApprovalLineTemplate>,
    ) {
        super(repository);
    }

    async findByStatus(status: ApprovalLineTemplateStatus): Promise<ApprovalLineTemplate[]> {
        return this.repository.find({
            where: { status },
            order: { createdAt: 'DESC' },
        });
    }

    async findByType(type: ApprovalLineType): Promise<ApprovalLineTemplate[]> {
        return this.repository.find({
            where: { type },
            order: { createdAt: 'DESC' },
        });
    }

    async findByDepartmentId(departmentId: string): Promise<ApprovalLineTemplate[]> {
        return this.repository.find({
            where: { departmentId },
            order: { createdAt: 'DESC' },
        });
    }
}
