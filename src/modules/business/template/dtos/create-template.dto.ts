import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, ValidateNested, IsEnum, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { DocumentTemplateStatus, ApprovalStepType, AssigneeRule } from '../../../../common/enums/approval.enum';

/**
 * 결재단계 템플릿 생성 DTO (문서 템플릿 생성 시 함께 생성)
 */
export class ApprovalStepTemplateItemDto {
    @ApiProperty({
        description: '결재 단계 순서',
        example: 1,
    })
    @IsOptional()
    stepOrder?: number;

    @ApiProperty({
        description: '결재 단계 타입',
        enum: ApprovalStepType,
        example: ApprovalStepType.APPROVAL,
    })
    @IsEnum(ApprovalStepType)
    stepType: ApprovalStepType;

    @ApiProperty({
        description: '할당 규칙',
        enum: AssigneeRule,
        example: AssigneeRule.FIXED,
    })
    @IsEnum(AssigneeRule)
    assigneeRule: AssigneeRule;

    @ApiPropertyOptional({
        description: '대상 직원 ID (FIXED 규칙인 경우)',
        example: 'uuid',
    })
    @IsOptional()
    @IsUUID()
    targetEmployeeId?: string;

    @ApiPropertyOptional({
        description: '대상 부서 ID (DEPARTMENT_REFERENCE 규칙인 경우)',
        example: 'uuid',
    })
    @IsOptional()
    @IsUUID()
    targetDepartmentId?: string;

    @ApiPropertyOptional({
        description: '대상 직책 ID (HIERARCHY_TO_POSITION 규칙인 경우)',
        example: 'uuid',
    })
    @IsOptional()
    @IsUUID()
    targetPositionId?: string;
}

/**
 * 문서 템플릿 생성 DTO (결재단계 템플릿 포함)
 */
export class CreateTemplateDto {
    @ApiProperty({
        description: '문서 템플릿 이름',
        example: '휴가 신청서',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: '문서 템플릿 코드',
        example: 'VAC',
    })
    @IsString()
    code: string;

    @ApiPropertyOptional({
        description: '문서 템플릿 설명',
        example: '연차/반차 신청을 위한 문서 템플릿',
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({
        description: '문서 HTML 템플릿',
        example: '<html>...</html>',
    })
    @IsString()
    template: string;

    @ApiPropertyOptional({
        description: '문서 템플릿 상태',
        enum: DocumentTemplateStatus,
        default: DocumentTemplateStatus.DRAFT,
    })
    @IsOptional()
    @IsEnum(DocumentTemplateStatus)
    status?: DocumentTemplateStatus;

    @ApiPropertyOptional({
        description: '카테고리 ID',
        example: 'uuid',
    })
    @IsOptional()
    @IsUUID()
    categoryId?: string;

    @ApiProperty({
        description: '결재단계 템플릿 목록',
        type: [ApprovalStepTemplateItemDto],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ApprovalStepTemplateItemDto)
    approvalSteps: ApprovalStepTemplateItemDto[];
}

