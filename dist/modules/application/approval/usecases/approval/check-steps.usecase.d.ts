import { DomainApprovalStepService } from 'src/modules/domain/approval-step/approval-step.service';
import { ApprovalStep } from 'src/database/entities/approval-step.entity';
export declare class CheckStepsUseCase {
    private readonly approvalStepService;
    constructor(approvalStepService: DomainApprovalStepService);
    execute(documentId: string): Promise<[ApprovalStep[], number]>;
}
