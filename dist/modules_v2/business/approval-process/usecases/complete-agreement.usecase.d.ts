import { ApprovalProcessContext } from '../../../context/approval-process/approval-process.context';
import { CompleteAgreementRequestDto } from '../dtos';
export declare class CompleteAgreementUsecase {
    private readonly approvalProcessContext;
    private readonly logger;
    constructor(approvalProcessContext: ApprovalProcessContext);
    execute(agreerId: string, dto: CompleteAgreementRequestDto): Promise<import("../../../domain").ApprovalStepSnapshot>;
}
