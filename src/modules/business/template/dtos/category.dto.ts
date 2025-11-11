import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, Min } from 'class-validator';

/**
 * 카테고리 생성 DTO
 */
export class CreateCategoryDto {
    @ApiProperty({
        description: '카테고리 이름',
        example: '인사',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: '카테고리 코드 (고유값)',
        example: 'HR',
    })
    @IsString()
    code: string;

    @ApiPropertyOptional({
        description: '카테고리 설명',
        example: '인사 관련 문서 템플릿',
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({
        description: '정렬 순서',
        example: 1,
        default: 0,
    })
    @IsOptional()
    @IsInt()
    @Min(0)
    order?: number;
}

/**
 * 카테고리 수정 DTO
 */
export class UpdateCategoryDto {
    @ApiPropertyOptional({
        description: '카테고리 이름',
        example: '인사',
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({
        description: '카테고리 코드 (고유값)',
        example: 'HR',
    })
    @IsOptional()
    @IsString()
    code?: string;

    @ApiPropertyOptional({
        description: '카테고리 설명',
        example: '인사 관련 문서 템플릿',
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({
        description: '정렬 순서',
        example: 1,
    })
    @IsOptional()
    @IsInt()
    @Min(0)
    order?: number;
}

