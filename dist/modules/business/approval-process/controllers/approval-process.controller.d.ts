import { ApprovalProcessService } from '../services/approval-process.service';
import { ApproveStepDto, RejectStepDto, CompleteAgreementDto, CompleteImplementationDto, CancelApprovalStepDto, MarkReferenceReadDto, ProcessApprovalActionDto, QueryMyPendingDto } from '../dtos';
import { Employee } from '../../../domain/employee/employee.entity';
export declare class ApprovalProcessController {
    private readonly approvalProcessService;
    constructor(approvalProcessService: ApprovalProcessService);
    completeAgreement(user: Employee, dto: CompleteAgreementDto): Promise<import("../../../domain").ApprovalStepSnapshot>;
    approveStep(user: Employee, dto: ApproveStepDto): Promise<import("../../../domain").ApprovalStepSnapshot>;
    completeImplementation(user: Employee, dto: CompleteImplementationDto): Promise<import("../../../domain").ApprovalStepSnapshot>;
    markReferenceRead(user: Employee, dto: MarkReferenceReadDto): Promise<import("../../../domain").ApprovalStepSnapshot>;
    rejectStep(user: Employee, dto: RejectStepDto): Promise<import("../../../domain").ApprovalStepSnapshot>;
    cancelApprovalStep(user: Employee, dto: CancelApprovalStepDto): Promise<import("../../../context/approval-process/dtos/approval-action.dto").CancelApprovalStepResultDto>;
    getMyPendingApprovals(user: Employee, query: QueryMyPendingDto): Promise<{
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
    processApprovalAction(user: Employee, dto: ProcessApprovalActionDto): Promise<import("../../../domain").Document | import("../../../domain").ApprovalStepSnapshot>;
}
