import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { StepEditRequestDto } from './create-form-request.dto';

export class CreateTemplateVersionRequestDto {
    @ApiPropertyOptional({ description: '결재선 템플릿 ID (검증용, 선택사항)', example: 'template-123' })
    @IsOptional()
    @IsString()
    templateId?: string;

    @ApiPropertyOptional({ description: '버전 변경 사유', example: '단계 추가' })
    @IsOptional()
    @IsString()
    versionNote?: string;

    @ApiProperty({ description: '결재 단계 목록', type: [StepEditRequestDto] })
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1, { message: '최소 1개 이상의 결재 단계가 필요합니다' })
    @ValidateNested({ each: true })
    @Type(() => StepEditRequestDto)
    steps: StepEditRequestDto[];
}
