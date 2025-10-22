import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { StepEditRequestDto } from './create-form-request.dto';

export class UpdateFormVersionRequestDto {
    @ApiPropertyOptional({ description: '문서양식 ID (검증용, 선택사항)', example: 'form-123' })
    @IsOptional()
    @IsString()
    formId?: string;

    @ApiPropertyOptional({ description: '버전 변경 사유', example: '결재선 수정' })
    @IsOptional()
    @IsString()
    versionNote?: string;

    @ApiPropertyOptional({ description: '문서양식 템플릿 (HTML)', example: '<h1>제목</h1><p>내용</p>' })
    @IsOptional()
    @IsString()
    template?: string;

    @ApiPropertyOptional({ description: '결재선 템플릿 버전 ID (결재선 변경 시)' })
    @IsOptional()
    @IsString()
    lineTemplateVersionId?: string;

    @ApiPropertyOptional({ description: '복제 후 수정 여부', example: false })
    @IsOptional()
    @IsBoolean()
    cloneAndEdit?: boolean;

    @ApiPropertyOptional({ description: '복제할 기준 결재선 템플릿 버전 ID (cloneAndEdit=true 시)' })
    @IsOptional()
    @IsString()
    baseLineTemplateVersionId?: string;

    @ApiPropertyOptional({ description: '단계 수정 정보 (cloneAndEdit=true 시 사용)', type: [StepEditRequestDto] })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => StepEditRequestDto)
    stepEdits?: StepEditRequestDto[];
}
