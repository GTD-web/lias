import { ApprovalFlowContext } from '../../../context/approval-flow/approval-flow.context';
import { CreateApprovalLineTemplateRequestDto } from '../dtos/create-approval-line-template-request.dto';
import { ApprovalLineTemplateResponseDto } from '../dtos';
export declare class CreateApprovalLineTemplateUsecase {
    private readonly approvalFlowContext;
    private readonly logger;
    constructor(approvalFlowContext: ApprovalFlowContext);
    execute(createdBy: string, dto: CreateApprovalLineTemplateRequestDto): Promise<ApprovalLineTemplateResponseDto>;
}
