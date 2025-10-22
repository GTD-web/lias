import { ApprovalFlowContext } from '../../../context/approval-flow/approval-flow.context';
import { UpdateFormVersionRequestDto, UpdateFormVersionResponseDto } from '../dtos';
export declare class UpdateFormVersionUsecase {
    private readonly approvalFlowContext;
    private readonly logger;
    constructor(approvalFlowContext: ApprovalFlowContext);
    execute(createdBy: string, dto: UpdateFormVersionRequestDto): Promise<UpdateFormVersionResponseDto>;
}
