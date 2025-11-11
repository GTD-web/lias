import { ApprovalStepType, ApprovalStatus } from '../../../../common/enums/approval.enum';

/**
 * 결재 승인 DTO
 */
export class ApproveStepDto {
    stepSnapshotId: string;
    approverId: string;
    comment?: string;
}

/**
 * 결재 반려 DTO
 */
export class RejectStepDto {
    stepSnapshotId: string;
    approverId: string;
    comment: string; // 반려 사유는 필수
}

/**
 * 협의 완료 DTO
 */
export class CompleteAgreementDto {
    stepSnapshotId: string;
    agreerId: string;
    comment?: string;
}

/**
 * 시행 완료 DTO
 */
export class CompleteImplementationDto {
    stepSnapshotId: string;
    implementerId: string;
    comment?: string;
    resultData?: Record<string, any>; // 시행 결과 데이터
}

/**
 * 결재 취소 DTO
 */
export class CancelApprovalDto {
    documentId: string;
    drafterId: string;
    reason: string;
}

/**
 * 결재선 조회 필터 DTO
 */
export class ApprovalStepFilterDto {
    documentId?: string;
    approverId?: string;
    status?: ApprovalStatus;
    stepType?: ApprovalStepType;
}
