import { Injectable, NotFoundException } from '@nestjs/common';
import { DomainApprovalStepRepository } from './approval-step.repository';
import { BaseService } from '../../../common/services/base.service';
import { ApprovalStep } from '../../../database/entities';
import { DateUtil } from 'src/common/utils/date.util';
import { QueryRunner } from 'typeorm';

@Injectable()
export class DomainApprovalStepService extends BaseService<ApprovalStep> {
    constructor(private readonly approvalStepRepository: DomainApprovalStepRepository) {
        super(approvalStepRepository);
    }

    async approve(id: string, queryRunner?: QueryRunner): Promise<ApprovalStep> {
        return await this.approvalStepRepository.update(
            id,
            { isApproved: true, approvedDate: DateUtil.now().toDate() },
            { queryRunner },
        );
    }

    async reject(id: string, queryRunner?: QueryRunner): Promise<ApprovalStep> {
        return await this.approvalStepRepository.update(
            id,
            { isApproved: false, approvedDate: DateUtil.now().toDate() },
            { queryRunner },
        );
    }
}
