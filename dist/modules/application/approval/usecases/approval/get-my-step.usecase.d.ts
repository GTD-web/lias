import { DomainApprovalStepService } from 'src/modules/domain/approval-step/approval-step.service';
import { ApprovalStep } from 'src/database/entities/approval-step.entity';
export declare class GetMyStepUseCase {
    private readonly approvalStepService;
    constructor(approvalStepService: DomainApprovalStepService);
    execute(documentId: string, employeeId: string): Promise<ApprovalStep[]>;
}
