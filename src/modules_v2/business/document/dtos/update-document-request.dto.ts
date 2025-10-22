import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDocumentRequestDto {
    @ApiProperty({
        description: '문서 제목',
        example: '2025년 1분기 예산안 (수정)',
        required: false,
    })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty({
        description: '문서 내용 (HTML 또는 문자열)',
        example: '<p>수정된 예산안 내용</p>',
        required: false,
    })
    @IsOptional()
    @IsString()
    content?: string;

    @ApiProperty({
        description: '메타데이터 (JSON)',
        example: { urgency: 'medium' },
        required: false,
    })
    @IsOptional()
    metadata?: Record<string, any>;
}
