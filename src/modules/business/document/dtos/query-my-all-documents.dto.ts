import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsUUID, IsString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * 문서 필터 타입 Enum (통계와 동일한 구분)
 */
export enum MyAllDocumentFilterType {
    /** 임시저장 (내가 기안한 문서 중 DRAFT 상태) */
    DRAFT = 'DRAFT',
    /** 상신함 (내가 기안한 제출된 전체 문서) */
    PENDING = 'PENDING',
    /** 합의함 (내가 협의자로 결재라인에 있는 문서, PENDING 상태) */
    PENDING_AGREEMENT = 'PENDING_AGREEMENT',
    /** 결재함 (내가 결재자로 결재라인에 있는 문서, PENDING 상태) */
    PENDING_APPROVAL = 'PENDING_APPROVAL',
    /** 시행함 (내가 시행자로 결재라인에 있는 문서, APPROVED 상태 - 결재 완료, 시행 대기) */
    IMPLEMENTATION = 'IMPLEMENTATION',
    /** 기결함 (내가 기안한 문서 중 IMPLEMENTED 상태 - 시행까지 완료) */
    APPROVED = 'APPROVED',
    /** 반려함 (내가 기안한 문서 중 REJECTED 상태) */
    REJECTED = 'REJECTED',
    /** 수신참조함 (내가 참조자로 있는 문서) */
    RECEIVED_REFERENCE = 'RECEIVED_REFERENCE',
}

/**
 * 승인 상태 필터 Enum (합의함, 결재함에만 적용)
 */
export enum ApprovalFilterStatus {
    /** 승인 예정 (아직 내 차례가 아님, 내 앞에 PENDING 단계가 있음) */
    SCHEDULED = 'SCHEDULED',
    /** 승인할 차례 (현재 내 차례, 내가 현재 PENDING 단계) */
    CURRENT = 'CURRENT',
    /** 승인 완료 (내가 이미 승인함, 내 단계가 APPROVED) */
    COMPLETED = 'COMPLETED',
}

/**
 * 참조 문서 열람 여부 필터 Enum (수신참조함에만 적용)
 */
export enum ReferenceReadStatus {
    /** 열람함 (status = APPROVED) */
    READ = 'READ',
    /** 미열람 (status = PENDING) */
    UNREAD = 'UNREAD',
}

/**
 * 내가 작성한 문서 + 내가 결재해야하는 문서 목록 조회 쿼리 DTO
 *
 * === 필터링 조건 가이드 ===
 *
 * ▣ 필터 타입 (filterType) - 통계와 동일한 구분
 * - DRAFT: 임시저장 (내가 기안한 문서)
 * - PENDING: 상신함 (내가 기안한 제출된 전체 문서)
 * - PENDING_AGREEMENT: 합의함
 * - PENDING_APPROVAL: 결재함
 * - IMPLEMENTATION: 시행함
 * - APPROVED: 기결함
 * - REJECTED: 반려함
 * - RECEIVED_REFERENCE: 수신참조함
 *
 * ▣ 승인 상태 필터 (approvalStatus) - PENDING_AGREEMENT, PENDING_APPROVAL에만 적용
 * - SCHEDULED: 승인 예정 (아직 내 차례가 아님)
 * - CURRENT: 승인할 차례 (현재 내 차례)
 * - COMPLETED: 승인 완료 (내가 이미 승인함)
 *
 * ▣ 참조 문서 열람 여부 필터 (referenceReadStatus) - RECEIVED_REFERENCE에만 적용
 * - READ: 열람함 (status = APPROVED)
 * - UNREAD: 미열람 (status = PENDING)
 *
 * ▣ 추가 필터링 옵션
 * - searchKeyword: 제목 검색
 * - categoryId: 카테고리 구분
 * - startDate, endDate: 제출일 구분
 */
export class QueryMyAllDocumentsDto {
    @ApiPropertyOptional({
        description: '사용자 ID (필수)',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @IsOptional()
    @IsUUID()
    userId?: string;

    @ApiPropertyOptional({
        description:
            '문서 필터 타입 (통계와 동일한 구분)\n' +
            '- DRAFT: 임시저장\n' +
            '- PENDING: 상신함\n' +
            '- PENDING_AGREEMENT: 합의함\n' +
            '- PENDING_APPROVAL: 결재함\n' +
            '- IMPLEMENTATION: 시행함\n' +
            '- APPROVED: 기결함\n' +
            '- REJECTED: 반려함\n' +
            '- RECEIVED_REFERENCE: 수신참조함',
        enum: MyAllDocumentFilterType,
        example: MyAllDocumentFilterType.PENDING_APPROVAL,
    })
    @IsOptional()
    @IsEnum(MyAllDocumentFilterType)
    filterType?: MyAllDocumentFilterType;

    @ApiPropertyOptional({
        description:
            '승인 상태 필터 (PENDING_AGREEMENT, PENDING_APPROVAL에만 적용)\n' +
            '- SCHEDULED: 승인 예정 (아직 내 차례가 아님)\n' +
            '- CURRENT: 승인할 차례 (현재 내 차례)\n' +
            '- COMPLETED: 승인 완료 (내가 이미 승인함)',
        enum: ApprovalFilterStatus,
        example: ApprovalFilterStatus.CURRENT,
    })
    @IsOptional()
    @IsEnum(ApprovalFilterStatus)
    approvalStatus?: ApprovalFilterStatus;

    @ApiPropertyOptional({
        description:
            '참조 문서 열람 여부 필터 (RECEIVED_REFERENCE에만 적용)\n' +
            '- READ: 열람함 (status = APPROVED)\n' +
            '- UNREAD: 미열람 (status = PENDING)',
        enum: ReferenceReadStatus,
        example: ReferenceReadStatus.UNREAD,
    })
    @IsOptional()
    @IsEnum(ReferenceReadStatus)
    referenceReadStatus?: ReferenceReadStatus;

    @ApiPropertyOptional({
        description: '제목 검색어',
        example: '휴가',
    })
    @IsOptional()
    @IsString()
    searchKeyword?: string;

    @ApiPropertyOptional({
        description: '카테고리 ID',
        example: 'uuid',
    })
    @IsOptional()
    @IsUUID()
    categoryId?: string;

    @ApiPropertyOptional({
        description: '제출 시작 날짜 (YYYY-MM-DD)',
        example: '2025-01-01',
    })
    @IsOptional()
    @IsString()
    startDate?: string;

    @ApiPropertyOptional({
        description: '제출 종료 날짜 (YYYY-MM-DD)',
        example: '2025-12-31',
    })
    @IsOptional()
    @IsString()
    endDate?: string;

    @ApiPropertyOptional({
        description: '페이지 번호 (1부터 시작)',
        example: 1,
        default: 1,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @ApiPropertyOptional({
        description: '페이지당 항목 수',
        example: 20,
        default: 20,
        minimum: 1,
        maximum: 100,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number = 20;
}
