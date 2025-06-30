import { DomainApprovalStepService } from 'src/modules/domain/approval-step/approval-step.service';
import { ApprovalStep } from 'src/database/entities/approval-step.entity';
import { QueryRunner } from 'typeorm';
export declare class ApproveStepUseCase {
    private readonly approvalStepService;
    constructor(approvalStepService: DomainApprovalStepService);
    execute(approvalStepId: string, queryRunner?: QueryRunner): Promise<ApprovalStep>;
}
