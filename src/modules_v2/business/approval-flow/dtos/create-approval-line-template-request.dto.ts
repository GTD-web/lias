import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsArray, ValidateNested, IsEnum, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { StepEditRequestDto } from './create-form-request.dto';
import { ApprovalLineType, DepartmentScopeType } from '../../../../common/enums/approval.enum';

export class CreateApprovalLineTemplateRequestDto {
    @ApiProperty({ description: '결재선 템플릿 이름', example: '일반 결재선' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiPropertyOptional({ description: '결재선 템플릿 설명', example: '부서 내 일반적인 결재 프로세스' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({
        description: '결재선 유형 (COMMON: 공통, DEDICATED: 전용)',
        example: 'COMMON',
        enum: ApprovalLineType,
    })
    @IsNotEmpty()
    @IsEnum(ApprovalLineType)
    type: ApprovalLineType;

    @ApiProperty({
        description: '조직 범위 (COMPANY: 전사, DEPARTMENT: 부서별)',
        example: 'COMPANY',
        enum: DepartmentScopeType,
    })
    @IsNotEmpty()
    @IsEnum(DepartmentScopeType)
    orgScope: DepartmentScopeType;

    @ApiPropertyOptional({ description: '대상 부서 ID (orgScope가 DEPARTMENT인 경우 필수)' })
    @IsOptional()
    @IsString()
    departmentId?: string;

    @ApiProperty({ description: '결재 단계 목록', type: [StepEditRequestDto] })
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1, { message: '최소 1개 이상의 결재 단계가 필요합니다' })
    @ValidateNested({ each: true })
    @Type(() => StepEditRequestDto)
    steps: StepEditRequestDto[];
}
