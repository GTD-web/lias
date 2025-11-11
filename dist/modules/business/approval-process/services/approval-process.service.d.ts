import { ApprovalProcessContext } from '../../../context/approval-process/approval-process.context';
import { ApproveStepDto, RejectStepDto, CompleteAgreementDto, CompleteImplementationDto, CancelApprovalDto, ProcessApprovalActionDto } from '../dtos';
export declare class ApprovalProcessService {
    private readonly approvalProcessContext;
    private readonly logger;
    constructor(approvalProcessContext: ApprovalProcessContext);
    approveStep(dto: ApproveStepDto): Promise<import("../../../domain").ApprovalStepSnapshot>;
    rejectStep(dto: RejectStepDto): Promise<import("../../../domain").ApprovalStepSnapshot>;
    completeAgreement(dto: CompleteAgreementDto): Promise<import("../../../domain").ApprovalStepSnapshot>;
    completeImplementation(dto: CompleteImplementationDto): Promise<import("../../../domain").ApprovalStepSnapshot>;
    cancelApproval(dto: CancelApprovalDto): Promise<import("../../../domain").Document>;
    getMyPendingApprovals(approverId: string): Promise<any[]>;
    getApprovalSteps(documentId: string): Promise<import("../../../domain").ApprovalStepSnapshot[]>;
    processApprovalAction(dto: ProcessApprovalActionDto): Promise<import("../../../domain").Document | import("../../../domain").ApprovalStepSnapshot>;
}
