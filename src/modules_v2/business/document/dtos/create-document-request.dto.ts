import { IsNotEmpty, IsString, IsUUID, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentRequestDto {
    @ApiProperty({
        description: '문서 양식 버전 ID',
        example: '123e4567-e89b-12d3-a456-426614174001',
    })
    @IsNotEmpty()
    @IsUUID()
    formVersionId: string;

    @ApiProperty({
        description: '문서 제목',
        example: '2025년 1분기 예산안',
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        description: '문서 내용 (HTML 또는 문자열)',
        example: '<p>예산안 내용</p>',
    })
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty({
        description: '메타데이터 (JSON)',
        example: { urgency: 'high' },
        required: false,
    })
    @IsOptional()
    metadata?: Record<string, any>;
}
