import { DocumentStatus } from '../../../../common/enums/approval.enum';

/**
 * 문서 생성 DTO
 */
export class CreateDocumentDto {
    formVersionId: string;
    title: string;
    content: string; // HTML 형태
    drafterId: string;
    metadata?: Record<string, any>; // 추가 메타데이터 (금액, 날짜 등)
}

/**
 * 문서 수정 DTO
 */
export class UpdateDocumentDto {
    title?: string;
    content?: string;
    metadata?: Record<string, any>;
}

/**
 * 문서 기안 DTO
 */
export class SubmitDocumentDto {
    documentId: string;
    draftContext: {
        drafterId: string;
        drafterDepartmentId: string;
        documentAmount?: number;
        documentType?: string;
    };
}

/**
 * 문서 조회 필터 DTO
 */
export class DocumentFilterDto {
    status?: DocumentStatus;
    drafterId?: string;
    formVersionId?: string;
    startDate?: Date;
    endDate?: Date;
    searchKeyword?: string;
}
