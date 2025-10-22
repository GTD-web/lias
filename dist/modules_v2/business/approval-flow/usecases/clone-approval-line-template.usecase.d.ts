import { ApprovalFlowContext } from '../../../context/approval-flow/approval-flow.context';
import { CloneTemplateRequestDto, ApprovalLineTemplateVersionResponseDto } from '../dtos';
export declare class CloneApprovalLineTemplateUsecase {
    private readonly approvalFlowContext;
    private readonly logger;
    constructor(approvalFlowContext: ApprovalFlowContext);
    execute(createdBy: string, dto: CloneTemplateRequestDto): Promise<ApprovalLineTemplateVersionResponseDto>;
}
