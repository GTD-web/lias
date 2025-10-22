import { ApprovalFlowContext } from '../../../context/approval-flow/approval-flow.context';
import { CreateFormRequestDto } from '../dtos';
import { CreateFormResponseDto } from '../dtos';
export declare class CreateFormWithApprovalLineUsecase {
    private readonly approvalFlowContext;
    private readonly logger;
    constructor(approvalFlowContext: ApprovalFlowContext);
    execute(createdBy: string, dto: CreateFormRequestDto): Promise<CreateFormResponseDto>;
}
