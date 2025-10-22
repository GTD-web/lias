import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { StepEditRequestDto } from './create-form-request.dto';

export class CloneTemplateRequestDto {
    @ApiProperty({ description: '복제할 기준 결재선 템플릿 버전 ID', example: 'template-version-123' })
    @IsNotEmpty()
    @IsString()
    baseTemplateVersionId: string;

    @ApiPropertyOptional({
        description: '새 템플릿 이름 (없으면 원본 템플릿에 새 버전 추가)',
        example: '지출결의 전용 결재선',
    })
    @IsOptional()
    @IsString()
    newTemplateName?: string;

    @ApiPropertyOptional({ description: '단계 수정 정보', type: [StepEditRequestDto] })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => StepEditRequestDto)
    stepEdits?: StepEditRequestDto[];
}
