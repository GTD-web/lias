import { DocumentStatus, ApprovalStepType } from '../../../../common/enums/approval.enum';

/**
 * 결재단계 스냅샷 항목 DTO (컨텍스트용)
 * approverSnapshot은 서버에서 approverId를 기반으로 자동 생성됩니다.
 */
export class ApprovalStepSnapshotItemDto {
    stepOrder: number;
    stepType: ApprovalStepType;
    approverId: string;
    id?: string; // 수정 시 필요
}

/**
 * 페이징 옵션 DTO
 */
export class PaginationOptionsDto {
    page: number;
    limit: number;
}

/**
 * 문서 생성 DTO
 */
export class CreateDocumentDto {
    documentTemplateId?: string; // 선택사항: 템플릿 없는 외부 문서 지원
    title: string;
    content: string; // HTML 형태
    drafterId: string;
    metadata?: Record<string, any>; // 추가 메타데이터 (금액, 날짜 등)
    approvalSteps?: ApprovalStepSnapshotItemDto[]; // 결재단계 스냅샷 목록
}

/**
 * 문서 수정 DTO
 */
export class UpdateDocumentDto {
    title?: string;
    content?: string;
    metadata?: Record<string, any>;
    status?: DocumentStatus; // 상태 업데이트용
    approvalSteps?: ApprovalStepSnapshotItemDto[]; // 결재단계 스냅샷 목록 (id가 있으면 수정, 없으면 생성)
}

/**
 * 문서 기안 DTO
 * 임시저장된 문서를 기안합니다.
 */
export class SubmitDocumentDto {
    documentId: string; // 기안할 문서 ID (임시저장된 문서)
    documentTemplateId?: string; // 문서 템플릿 ID (기안 시점에 지정 가능)
    approvalSteps?: ApprovalStepSnapshotItemDto[]; // 결재단계 스냅샷 목록 (기안 시 결재선 설정)
}

/**
 * 문서 조회 필터 DTO
 */
export class DocumentFilterDto {
    status?: DocumentStatus;
    pendingStepType?: ApprovalStepType; // PENDING 상태일 때, 대기 중인 단계 타입
    drafterId?: string; // 기안자로 필터링
    referenceUserId?: string; // 참조자로 필터링 (내가 참조자로 있는 문서)
    categoryId?: string;
    documentTemplateId?: string;
    startDate?: Date;
    endDate?: Date;
    searchKeyword?: string;
    page?: number;
    limit?: number;
}
