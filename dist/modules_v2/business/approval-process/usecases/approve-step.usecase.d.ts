import { ApprovalProcessContext } from '../../../context/approval-process/approval-process.context';
import { ApproveStepRequestDto } from '../dtos';
export declare class ApproveStepUsecase {
    private readonly approvalProcessContext;
    private readonly logger;
    constructor(approvalProcessContext: ApprovalProcessContext);
    execute(approverId: string, dto: ApproveStepRequestDto): Promise<import("../../../domain").ApprovalStepSnapshot>;
}
