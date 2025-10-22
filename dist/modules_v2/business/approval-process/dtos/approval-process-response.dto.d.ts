import { ApprovalStatus, ApprovalStepType } from '../../../../common/enums/approval.enum';
export declare class ApprovalStepResponseDto {
    id: string;
    snapshotId: string;
    stepOrder: number;
    stepType: ApprovalStepType;
    approverId: string;
    approverName?: string;
    approverDepartmentId?: string;
    approverDepartmentName?: string;
    approverPositionId?: string;
    approverPositionTitle?: string;
    assigneeRule?: string;
    status: ApprovalStatus;
    comment?: string;
    approvedAt?: Date;
    isRequired?: boolean;
    description?: string;
    createdAt: Date;
    documentId?: string;
    documentTitle?: string;
    documentNumber?: string;
    drafterId?: string;
    drafterName?: string;
    drafterDepartmentName?: string;
    documentStatus?: string;
    submittedAt?: Date;
}
export declare class DocumentApprovalStatusResponseDto {
    documentId: string;
    steps: ApprovalStepResponseDto[];
    totalSteps: number;
    completedSteps: number;
}
