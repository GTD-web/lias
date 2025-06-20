import { DomainFormApprovalLineService } from '../../../../domain/form-approval-line/form-approval-line.service';
import { FormApprovalLineResponseDto } from '../../dtos';
export declare class FindApprovalLineByIdUseCase {
    private readonly formApprovalLineService;
    constructor(formApprovalLineService: DomainFormApprovalLineService);
    execute(id: string): Promise<FormApprovalLineResponseDto>;
}
