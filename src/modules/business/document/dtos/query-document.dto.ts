import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsUUID, IsString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { DocumentStatus, ApprovalStepType } from '../../../../common/enums/approval.enum';

/**
 * 문서 목록 조회 쿼리 DTO
 */
export class QueryDocumentsDto {
    @ApiPropertyOptional({
        description: '문서 상태',
        enum: DocumentStatus,
        example: DocumentStatus.PENDING,
    })
    @IsOptional()
    @IsEnum(DocumentStatus)
    status?: DocumentStatus;

    @ApiPropertyOptional({
        description: '대기 중인 단계 타입 (status가 PENDING일 때만 유효)',
        enum: ApprovalStepType,
        example: ApprovalStepType.APPROVAL,
    })
    @IsOptional()
    @IsEnum(ApprovalStepType)
    pendingStepType?: ApprovalStepType;

    @ApiPropertyOptional({
        description: '기안자 ID',
        example: 'uuid',
    })
    @IsOptional()
    @IsUUID()
    drafterId?: string;

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

