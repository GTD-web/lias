import { ApprovalProcessContext } from '../../../context/approval-process/approval-process.context';
import { RejectStepRequestDto } from '../dtos';
export declare class RejectStepUsecase {
    private readonly approvalProcessContext;
    private readonly logger;
    constructor(approvalProcessContext: ApprovalProcessContext);
    execute(approverId: string, dto: RejectStepRequestDto): Promise<import("../../../domain").ApprovalStepSnapshot>;
}
