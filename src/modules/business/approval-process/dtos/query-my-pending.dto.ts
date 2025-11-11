import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsUUID, IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * 내 대기 목록 조회 타입
 */
export enum MyPendingType {
    /** 상신: 내가 기안한 문서들 중 결재 대기 중인 문서 */
    SUBMITTED = 'SUBMITTED',
    /** 합의: 내가 합의해야 하는 문서들 */
    AGREEMENT = 'AGREEMENT',
    /** 미결: 내가 결재해야 하는 문서들 */
    APPROVAL = 'APPROVAL',
}

/**
 * 내 결재 대기 목록 조회 쿼리 DTO
 */
export class QueryMyPendingDto {
    @ApiProperty({
        description: '사용자 ID (기안자 또는 결재자)',
        example: 'uuid',
    })
    @IsUUID()
    userId: string;

    @ApiProperty({
        description: '조회 타입 (상신/합의/미결)',
        enum: MyPendingType,
        example: MyPendingType.APPROVAL,
    })
    @IsEnum(MyPendingType)
    type: MyPendingType;

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

