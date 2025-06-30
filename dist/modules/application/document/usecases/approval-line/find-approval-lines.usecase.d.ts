import { DomainFormApprovalLineService } from '../../../../domain/form-approval-line/form-approval-line.service';
import { FormApprovalLineResponseDto } from '../../dtos';
import { PaginationData } from 'src/common/dtos/pagination-response.dto';
import { ApprovalLineType } from 'src/common/enums/approval.enum';
export declare class FindApprovalLinesUseCase {
    private readonly formApprovalLineService;
    constructor(formApprovalLineService: DomainFormApprovalLineService);
    execute(page: number, limit: number, type?: ApprovalLineType): Promise<PaginationData<FormApprovalLineResponseDto>>;
}
