import { DomainFormApprovalLineService } from 'src/modules/domain/form-approval-line/form-approval-line.service';
import { DomainFormApprovalStepService } from 'src/modules/domain/form-approval-step/form-approval-step.service';
import { DataSource } from 'typeorm';
export declare class DeleteApprovalLineUseCase {
    private readonly formApprovalLineService;
    private readonly formApprovalStepService;
    private readonly dataSource;
    constructor(formApprovalLineService: DomainFormApprovalLineService, formApprovalStepService: DomainFormApprovalStepService, dataSource: DataSource);
    execute(id: string): Promise<boolean>;
}
