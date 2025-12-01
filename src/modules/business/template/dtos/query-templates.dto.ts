import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsUUID, IsString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { DocumentTemplateStatus } from '../../../../common/enums/approval.enum';

/**
 * 정렬 순서 Enum
 */
export enum SortOrder {
    /** 최신순 (createdAt DESC) */
    LATEST = 'LATEST',
    /** 오래된순 (createdAt ASC) */
    OLDEST = 'OLDEST',
}

/**
 * 문서 템플릿 목록 조회 쿼리 DTO
 *
 * === 필터링 조건 가이드 ===
 *
 * ▣ 검색 및 필터
 * - searchKeyword: 템플릿 이름 또는 설명에서 검색
 * - categoryId: 특정 카테고리로 필터링
 * - status: 템플릿 상태로 필터링 (DRAFT, ACTIVE, DEPRECATED)
 *
 * ▣ 정렬
 * - sortOrder: LATEST (최신순), OLDEST (오래된순)
 *
 * ▣ 페이지네이션
 * - page: 페이지 번호 (1부터 시작)
 * - limit: 페이지당 항목 수 (최대 100)
 */
export class QueryTemplatesDto {
    @ApiPropertyOptional({
        description: '검색어 (템플릿 이름 또는 설명에서 검색)',
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

    // @ApiPropertyOptional({
    //     description: '템플릿 상태',
    //     enum: DocumentTemplateStatus,
    //     example: DocumentTemplateStatus.ACTIVE,
    // })
    // @IsOptional()
    // @IsEnum(DocumentTemplateStatus)
    // status?: DocumentTemplateStatus;

    @ApiPropertyOptional({
        description: '정렬 순서\n- LATEST: 최신순 (기본값)\n- OLDEST: 오래된순',
        enum: SortOrder,
        example: SortOrder.LATEST,
        default: SortOrder.LATEST,
    })
    @IsOptional()
    @IsEnum(SortOrder)
    sortOrder?: SortOrder = SortOrder.LATEST;

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
