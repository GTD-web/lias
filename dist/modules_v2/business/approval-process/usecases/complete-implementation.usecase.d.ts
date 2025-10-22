import { ApprovalProcessContext } from '../../../context/approval-process/approval-process.context';
import { CompleteImplementationRequestDto } from '../dtos';
export declare class CompleteImplementationUsecase {
    private readonly approvalProcessContext;
    private readonly logger;
    constructor(approvalProcessContext: ApprovalProcessContext);
    execute(implementerId: string, dto: CompleteImplementationRequestDto): Promise<import("../../../domain").ApprovalStepSnapshot>;
}
