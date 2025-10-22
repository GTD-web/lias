import { ApprovalProcessContext } from '../../../context/approval-process/approval-process.context';
import { CancelApprovalRequestDto } from '../dtos';
export declare class CancelApprovalUsecase {
    private readonly approvalProcessContext;
    private readonly logger;
    constructor(approvalProcessContext: ApprovalProcessContext);
    execute(drafterId: string, dto: CancelApprovalRequestDto): Promise<import("../../../domain").Document>;
}
