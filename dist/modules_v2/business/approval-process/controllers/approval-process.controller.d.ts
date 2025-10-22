import { ApproveStepRequestDto, RejectStepRequestDto, CompleteAgreementRequestDto, CompleteImplementationRequestDto, CancelApprovalRequestDto, ApprovalStepResponseDto, DocumentApprovalStatusResponseDto } from '../dtos';
import { ApproveStepUsecase, RejectStepUsecase, CompleteAgreementUsecase, CompleteImplementationUsecase, CancelApprovalUsecase, GetApprovalStatusUsecase } from '../usecases';
import { Employee } from '../../../domain/employee/employee.entity';
export declare class ApprovalProcessController {
    private readonly approveStepUsecase;
    private readonly rejectStepUsecase;
    private readonly completeAgreementUsecase;
    private readonly completeImplementationUsecase;
    private readonly cancelApprovalUsecase;
    private readonly getApprovalStatusUsecase;
    constructor(approveStepUsecase: ApproveStepUsecase, rejectStepUsecase: RejectStepUsecase, completeAgreementUsecase: CompleteAgreementUsecase, completeImplementationUsecase: CompleteImplementationUsecase, cancelApprovalUsecase: CancelApprovalUsecase, getApprovalStatusUsecase: GetApprovalStatusUsecase);
    approveStep(user: Employee, dto: ApproveStepRequestDto): Promise<ApprovalStepResponseDto>;
    rejectStep(user: Employee, dto: RejectStepRequestDto): Promise<ApprovalStepResponseDto>;
    completeAgreement(user: Employee, dto: CompleteAgreementRequestDto): Promise<ApprovalStepResponseDto>;
    completeImplementation(user: Employee, dto: CompleteImplementationRequestDto): Promise<ApprovalStepResponseDto>;
    cancelApproval(user: Employee, dto: CancelApprovalRequestDto): Promise<import("../../../domain").Document>;
    getMyPendingApprovals(user: Employee): Promise<ApprovalStepResponseDto[]>;
    getApprovalSteps(documentId: string): Promise<DocumentApprovalStatusResponseDto>;
}
