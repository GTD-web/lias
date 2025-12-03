import { QueryRunner } from 'typeorm';
import { DomainApprovalStepSnapshotService } from '../../domain/approval-step-snapshot/approval-step-snapshot.service';
import { DomainEmployeeService } from '../../domain/employee/employee.service';
import { ApprovalStepType } from '../../../common/enums/approval.enum';
export interface ApprovalStepInfo {
    id?: string;
    stepOrder: number;
    stepType: ApprovalStepType;
    approverId: string;
}
export declare class ApprovalStepSnapshotContext {
    private readonly approvalStepSnapshotService;
    private readonly employeeService;
    private readonly logger;
    constructor(approvalStepSnapshotService: DomainApprovalStepSnapshotService, employeeService: DomainEmployeeService);
    createApprovalStepSnapshots(documentId: string, approvalSteps: ApprovalStepInfo[], queryRunner: QueryRunner): Promise<void>;
    updateApprovalStepSnapshots(documentId: string, approvalSteps: ApprovalStepInfo[], queryRunner: QueryRunner): Promise<void>;
    validateAndProcessApprovalSteps(documentId: string, approvalSteps?: ApprovalStepInfo[], queryRunner?: QueryRunner): Promise<void>;
    private buildApproverSnapshot;
}
