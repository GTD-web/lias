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
    getMyPendingApprovals(userId: string, type: 'SUBMITTED' | 'AGREEMENT' | 'APPROVAL', page: number, limit: number): Promise<{
        data: {
            documentId: string;
            documentNumber: string;
            title: string;
            status: import("../../../../common/enums").DocumentStatus;
            drafterId: string;
            drafterName: string;
            drafterDepartmentName: any;
            currentStep: {
                id: string;
                stepOrder: number;
                stepType: import("../../../../common/enums").ApprovalStepType;
                status: import("../../../../common/enums").ApprovalStatus;
                approverId: string;
                approverSnapshot: import("../../../domain/approval-step-snapshot/approval-step-snapshot.entity").ApproverSnapshotMetadata;
            };
            approvalSteps: {
                id: string;
                stepOrder: number;
                stepType: import("../../../../common/enums").ApprovalStepType;
                status: import("../../../../common/enums").ApprovalStatus;
                approverId: string;
                approverName: string;
                comment: string;
                approvedAt: Date;
            }[];
            submittedAt: Date;
            createdAt: Date;
        }[];
        meta: {
            currentPage: number;
            itemsPerPage: number;
            totalItems: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
    }>;
    getApprovalSteps(documentId: string): Promise<import("../../../domain").ApprovalStepSnapshot[]>;
    processApprovalAction(dto: ProcessApprovalActionDto): Promise<import("../../../domain").ApprovalStepSnapshot | import("../../../domain").Document>;
}
