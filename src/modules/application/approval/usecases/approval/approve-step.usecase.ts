import { Injectable } from '@nestjs/common';
import { DomainApprovalStepService } from 'src/modules/domain/approval-step/approval-step.service';
import { ApprovalStep } from 'src/database/entities/approval-step.entity';
import { QueryRunner } from 'typeorm';

@Injectable()
export class ApproveStepUseCase {
    constructor(private readonly approvalStepService: DomainApprovalStepService) {}

    async execute(approvalStepId: string, queryRunner?: QueryRunner): Promise<ApprovalStep> {
        return await this.approvalStepService.approve(approvalStepId, queryRunner);
    }
}
