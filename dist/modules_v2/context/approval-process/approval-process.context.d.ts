import { DataSource, QueryRunner } from 'typeorm';
import { DomainApprovalStepSnapshotService } from '../../domain/approval-step-snapshot/approval-step-snapshot.service';
import { DomainApprovalLineSnapshotService } from '../../domain/approval-line-snapshot/approval-line-snapshot.service';
import { DomainDocumentService } from '../../domain/document/document.service';
import { ApproveStepDto, RejectStepDto, CompleteAgreementDto, CompleteImplementationDto, CancelApprovalDto } from './dtos/approval-action.dto';
export declare class ApprovalProcessContext {
    private readonly dataSource;
    private readonly approvalStepSnapshotService;
    private readonly approvalLineSnapshotService;
    private readonly documentService;
    private readonly logger;
    constructor(dataSource: DataSource, approvalStepSnapshotService: DomainApprovalStepSnapshotService, approvalLineSnapshotService: DomainApprovalLineSnapshotService, documentService: DomainDocumentService);
    approveStep(dto: ApproveStepDto, externalQueryRunner?: QueryRunner): Promise<import("../../domain").ApprovalStepSnapshot>;
    rejectStep(dto: RejectStepDto, externalQueryRunner?: QueryRunner): Promise<import("../../domain").ApprovalStepSnapshot>;
    completeAgreement(dto: CompleteAgreementDto, externalQueryRunner?: QueryRunner): Promise<import("../../domain").ApprovalStepSnapshot>;
    completeImplementation(dto: CompleteImplementationDto, externalQueryRunner?: QueryRunner): Promise<import("../../domain").ApprovalStepSnapshot>;
    cancelApproval(dto: CancelApprovalDto, externalQueryRunner?: QueryRunner): Promise<import("../../domain").Document>;
    getMyPendingApprovals(approverId: string, queryRunner?: QueryRunner): Promise<any[]>;
    getApprovalSteps(documentId: string, queryRunner?: QueryRunner): Promise<import("../../domain").ApprovalStepSnapshot[]>;
    private checkAndUpdateDocumentStatus;
    private validateApprovalOrder;
    private validateImplementationPrecondition;
    private canProcessStep;
}
