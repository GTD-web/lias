import { ApprovalProcessService } from '../services/approval-process.service';
import { ApproveStepDto, RejectStepDto, CompleteAgreementDto, CompleteImplementationDto, CancelApprovalDto, ProcessApprovalActionDto } from '../dtos';
export declare class ApprovalProcessController {
    private readonly approvalProcessService;
    constructor(approvalProcessService: ApprovalProcessService);
    approveStep(dto: ApproveStepDto): Promise<import("../../../domain").ApprovalStepSnapshot>;
    rejectStep(dto: RejectStepDto): Promise<import("../../../domain").ApprovalStepSnapshot>;
    completeAgreement(dto: CompleteAgreementDto): Promise<import("../../../domain").ApprovalStepSnapshot>;
    completeImplementation(dto: CompleteImplementationDto): Promise<import("../../../domain").ApprovalStepSnapshot>;
    cancelApproval(dto: CancelApprovalDto): Promise<import("../../../domain").Document>;
    getMyPendingApprovals(approverId: string): Promise<any[]>;
    getApprovalSteps(documentId: string): Promise<import("../../../domain").ApprovalStepSnapshot[]>;
    processApprovalAction(dto: ProcessApprovalActionDto): Promise<import("../../../domain").ApprovalStepSnapshot | import("../../../domain").Document>;
}
