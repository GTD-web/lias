import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsUUID, IsString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { DocumentStatus, ApprovalStepType } from '../../../../common/enums/approval.enum';

/**
 * 문서 목록 조회 쿼리 DTO
 *
 * === 필터링 조건 가이드 ===
 *
 * ▣ 내가 기안한 문서 조회 (drafterId 지정)
 * 1. 임시저장:     status=DRAFT, pendingStepType 미지정
 * 2. 전체 상신:     status 미지정, pendingStepType 미지정
 * 3. 협의 대기:     status=PENDING, pendingStepType=AGREEMENT
 * 4. 미결 대기:     status=PENDING, pendingStepType=APPROVAL
 * 5. 기결:         status=APPROVED, pendingStepType 미지정
 * 6. 반려:         status=REJECTED, pendingStepType 미지정
 * 7. 시행:         status=IMPLEMENTED, pendingStepType 미지정
 *
 * ▣ 내가 참조자로 있는 문서 조회 (referenceUserId 지정)
 * 8. 참조:         referenceUserId만 지정, status 미지정, pendingStepType 미지정 (DRAFT 제외)
 *
 * ⚠️ 주의사항:
 * - drafterId와 referenceUserId는 상호 배타적 (referenceUserId 우선)
 * - PENDING 상태는 현재 진행 중인 단계(가장 작은 stepOrder)를 기준으로 분류
 * - 참조 문서는 임시저장(DRAFT) 상태 제외
 */
export class QueryDocumentsDto {
    @ApiPropertyOptional({
        description: '문서 상태 (DRAFT=임시저장, PENDING=대기, APPROVED=승인, REJECTED=반려, IMPLEMENTED=시행)',
        enum: DocumentStatus,
        example: DocumentStatus.PENDING,
    })
    @IsOptional()
    @IsEnum(DocumentStatus)
    status?: DocumentStatus;

    @ApiPropertyOptional({
        description: 'PENDING 상태일 때 현재 단계 타입 (AGREEMENT=협의, APPROVAL=미결)',
        enum: ApprovalStepType,
        example: ApprovalStepType.APPROVAL,
    })
    @IsOptional()
    @IsEnum(ApprovalStepType)
    pendingStepType?: ApprovalStepType;

    @ApiPropertyOptional({
        description: '기안자 ID (내가 기안한 문서 조회)',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @IsOptional()
    @IsUUID()
    drafterId?: string;

    @ApiPropertyOptional({
        description: '참조자 ID (내가 참조자로 있는 문서 조회, 기안자 무관, DRAFT 제외)',
        example: '550e8400-e29b-41d4-a716-446655440001',
    })
    @IsOptional()
    @IsUUID()
    referenceUserId?: string;

    @ApiPropertyOptional({
        description: '카테고리 ID',
        example: 'uuid',
    })
    @IsOptional()
    @IsUUID()
    categoryId?: string;

    @ApiPropertyOptional({
        description: '검색어 (문서 제목)',
        example: '휴가',
    })
    @IsOptional()
    @IsString()
    searchKeyword?: string;

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

    @ApiPropertyOptional({
        description: '시작 날짜 (YYYY-MM-DD)',
        example: '2025-01-01',
    })
    @IsOptional()
    @IsString()
    startDate?: string;

    @ApiPropertyOptional({
        description: '종료 날짜 (YYYY-MM-DD)',
        example: '2025-12-31',
    })
    @IsOptional()
    @IsString()
    endDate?: string;
}
