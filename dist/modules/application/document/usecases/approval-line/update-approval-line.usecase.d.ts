import { DomainFormApprovalLineService } from '../../../../domain/form-approval-line/form-approval-line.service';
import { DomainFormApprovalStepService } from '../../../../domain/form-approval-step/form-approval-step.service';
import { UpdateFormApprovalLineDto } from '../../dtos/approval-line.dto';
import { FormApprovalLine } from '../../../../../database/entities/form-approval-line.entity';
import { Employee } from '../../../../../database/entities/employee.entity';
export declare class UpdateApprovalLineUseCase {
    private readonly formApprovalLineService;
    private readonly formApprovalStepService;
    constructor(formApprovalLineService: DomainFormApprovalLineService, formApprovalStepService: DomainFormApprovalStepService);
    execute(user: Employee, dto: UpdateFormApprovalLineDto): Promise<FormApprovalLine>;
}
