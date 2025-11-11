import { DataSource, QueryRunner } from 'typeorm';
import { DomainApprovalStepSnapshotService } from '../../domain/approval-step-snapshot/approval-step-snapshot.service';
import { DomainDocumentService } from '../../domain/document/document.service';
import { Document } from '../../domain/document/document.entity';
import { ApprovalStepSnapshot } from '../../domain/approval-step-snapshot/approval-step-snapshot.entity';
import { ApproveStepDto, RejectStepDto, CompleteAgreementDto, CompleteImplementationDto, CancelApprovalDto } from './dtos/approval-action.dto';
import { ApprovalStatus, ApprovalStepType, DocumentStatus } from '../../../common/enums/approval.enum';
export declare class ApprovalProcessContext {
    private readonly dataSource;
    private readonly approvalStepSnapshotService;
    private readonly documentService;
    private readonly logger;
    constructor(dataSource: DataSource, approvalStepSnapshotService: DomainApprovalStepSnapshotService, documentService: DomainDocumentService);
    approveStep(dto: ApproveStepDto, externalQueryRunner?: QueryRunner): Promise<ApprovalStepSnapshot>;
    rejectStep(dto: RejectStepDto, externalQueryRunner?: QueryRunner): Promise<ApprovalStepSnapshot>;
    completeAgreement(dto: CompleteAgreementDto, externalQueryRunner?: QueryRunner): Promise<ApprovalStepSnapshot>;
    completeImplementation(dto: CompleteImplementationDto, externalQueryRunner?: QueryRunner): Promise<ApprovalStepSnapshot>;
    cancelApproval(dto: CancelApprovalDto, externalQueryRunner?: QueryRunner): Promise<Document>;
    getMyPendingApprovals(userId: string, type: 'SUBMITTED' | 'AGREEMENT' | 'APPROVAL', page?: number, limit?: number, queryRunner?: QueryRunner): Promise<{
        data: {
            documentId: string;
            documentNumber: string;
            title: string;
            status: DocumentStatus;
            drafterId: string;
            drafterName: string;
            drafterDepartmentName: any;
            currentStep: {
                id: string;
                stepOrder: number;
                stepType: ApprovalStepType;
                status: ApprovalStatus;
                approverId: string;
                approverSnapshot: import("../../domain/approval-step-snapshot/approval-step-snapshot.entity").ApproverSnapshotMetadata;
            };
            approvalSteps: {
                id: string;
                stepOrder: number;
                stepType: ApprovalStepType;
                status: ApprovalStatus;
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
    getApprovalSteps(documentId: string, queryRunner?: QueryRunner): Promise<ApprovalStepSnapshot[]>;
    private checkAndUpdateDocumentStatus;
    private validateApprovalOrder;
    private validateImplementationPrecondition;
    autoApproveIfDrafterIsFirstApprover(documentId: string, drafterId: string, queryRunner?: QueryRunner): Promise<void>;
    private canProcessStepOptimized;
    private canProcessStep;
}
