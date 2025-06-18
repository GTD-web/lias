import { DomainFormApprovalLineService } from '../../../domain/form-approval-line/form-approval-line.service';
import { FormApprovalLineResponseDto } from '../dtos';
export declare class FindApprovalLinesUseCase {
    private readonly formApprovalLineService;
    constructor(formApprovalLineService: DomainFormApprovalLineService);
    execute(): Promise<FormApprovalLineResponseDto[]>;
}
