import { DomainApprovalStepService } from 'src/modules/domain/approval-step/approval-step.service';
import { ApprovalStep } from 'src/database/entities/approval-step.entity';
export declare class RejectStepUseCase {
    private readonly approvalStepService;
    constructor(approvalStepService: DomainApprovalStepService);
    execute(approvalStepId: string): Promise<ApprovalStep>;
}
