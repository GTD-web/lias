import { ApprovalFlowContext } from '../../../context/approval-flow/approval-flow.context';
import { CreateTemplateVersionRequestDto, ApprovalLineTemplateVersionResponseDto } from '../dtos';
export declare class CreateApprovalLineTemplateVersionUsecase {
    private readonly approvalFlowContext;
    private readonly logger;
    constructor(approvalFlowContext: ApprovalFlowContext);
    execute(createdBy: string, dto: CreateTemplateVersionRequestDto): Promise<ApprovalLineTemplateVersionResponseDto>;
}
