import { Injectable } from '@nestjs/common';
import { DomainApprovalStepService } from 'src/modules/domain/approval-step/approval-step.service';
import { ApprovalStep } from 'src/database/entities/approval-step.entity';

@Injectable()
export class RejectStepUseCase {
    constructor(private readonly approvalStepService: DomainApprovalStepService) {}

    async execute(approvalStepId: string): Promise<ApprovalStep> {
        return await this.approvalStepService.reject(approvalStepId);
    }
}
