import { DomainFormApprovalLineService } from '../../../domain/form-approval-line/form-approval-line.service';
import { DomainFormApprovalStepService } from '../../../domain/form-approval-step/form-approval-step.service';
import { CreateFormApprovalLineDto } from '../dtos/approval-line.dto';
import { FormApprovalLine } from '../../../../database/entities/form-approval-line.entity';
export declare class CreateApprovalLineUseCase {
    private readonly formApprovalLineService;
    private readonly formApprovalStepService;
    constructor(formApprovalLineService: DomainFormApprovalLineService, formApprovalStepService: DomainFormApprovalStepService);
    execute(dto: CreateFormApprovalLineDto): Promise<FormApprovalLine>;
}
