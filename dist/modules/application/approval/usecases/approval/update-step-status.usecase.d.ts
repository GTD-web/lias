import { DomainApprovalStepService } from 'src/modules/domain/approval-step/approval-step.service';
import { ApprovalStep } from 'src/database/entities/approval-step.entity';
export declare class ArrpoveStepUseCase {
    private readonly approvalStepService;
    constructor(approvalStepService: DomainApprovalStepService);
    execute(id: string): Promise<ApprovalStep>;
}
