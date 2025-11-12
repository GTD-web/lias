import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DocumentTemplateStatus, ApprovalStepType, AssigneeRule } from '../../../../common/enums/approval.enum';

/**
 * 카테고리에 포함된 문서 템플릿 간단 정보 DTO
 */
export class CategoryDocumentTemplateDto {
    @ApiProperty({
        description: '문서 템플릿 ID',
        example: 'uuid',
    })
    id: string;

    @ApiProperty({
        description: '문서 템플릿 이름',
        example: '휴가 신청서',
    })
    name: string;

    @ApiProperty({
        description: '문서 템플릿 코드',
        example: 'VAC',
    })
    code: string;

    @ApiPropertyOptional({
        description: '문서 템플릿 설명',
        example: '연차/반차 신청을 위한 문서 템플릿',
    })
    description?: string;

    @ApiProperty({
        description: '문서 템플릿 상태',
        enum: DocumentTemplateStatus,
        example: DocumentTemplateStatus.ACTIVE,
    })
    status: DocumentTemplateStatus;
}

/**
 * 카테고리 응답 DTO
 */
export class CategoryResponseDto {
    @ApiProperty({
        description: '카테고리 ID',
        example: 'uuid',
    })
    id: string;

    @ApiProperty({
        description: '카테고리 이름',
        example: '인사',
    })
    name: string;

    @ApiProperty({
        description: '카테고리 코드',
        example: 'HR',
    })
    code: string;

    @ApiPropertyOptional({
        description: '카테고리 설명',
        example: '인사 관련 문서 템플릿',
    })
    description?: string;

    @ApiProperty({
        description: '정렬 순서',
        example: 1,
    })
    order: number;

    @ApiProperty({
        description: '생성일',
        example: '2025-11-11T00:00:00.000Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: '수정일',
        example: '2025-11-11T00:00:00.000Z',
    })
    updatedAt: Date;

    @ApiPropertyOptional({
        description: '카테고리에 속한 문서 템플릿 목록',
        type: [CategoryDocumentTemplateDto],
    })
    documentTemplates?: CategoryDocumentTemplateDto[];
}

/**
 * 결재단계 템플릿 응답 DTO
 */
export class ApprovalStepTemplateResponseDto {
    @ApiProperty({
        description: '결재 단계 템플릿 ID',
        example: 'uuid',
    })
    id: string;

    @ApiProperty({
        description: '문서 템플릿 ID',
        example: 'uuid',
    })
    documentTemplateId: string;

    @ApiProperty({
        description: '결재 단계 순서',
        example: 1,
    })
    stepOrder: number;

    @ApiProperty({
        description: '결재 단계 타입',
        enum: ApprovalStepType,
        example: ApprovalStepType.APPROVAL,
    })
    stepType: ApprovalStepType;

    @ApiProperty({
        description: '할당 규칙',
        enum: AssigneeRule,
        example: AssigneeRule.FIXED,
    })
    assigneeRule: AssigneeRule;

    @ApiPropertyOptional({
        description: '대상 직원 ID',
        example: 'uuid',
    })
    targetEmployeeId?: string;

    @ApiPropertyOptional({
        description: '대상 부서 ID',
        example: 'uuid',
    })
    targetDepartmentId?: string;

    @ApiPropertyOptional({
        description: '대상 직책 ID',
        example: 'uuid',
    })
    targetPositionId?: string;
}

/**
 * 문서 템플릿 응답 DTO
 */
export class DocumentTemplateResponseDto {
    @ApiProperty({
        description: '문서 템플릿 ID',
        example: 'uuid',
    })
    id: string;

    @ApiProperty({
        description: '문서 템플릿 이름',
        example: '휴가 신청서',
    })
    name: string;

    @ApiProperty({
        description: '문서 템플릿 코드',
        example: 'VAC',
    })
    code: string;

    @ApiPropertyOptional({
        description: '문서 템플릿 설명',
        example: '연차/반차 신청을 위한 문서 템플릿',
    })
    description?: string;

    @ApiProperty({
        description: '문서 템플릿 상태',
        enum: DocumentTemplateStatus,
        example: DocumentTemplateStatus.ACTIVE,
    })
    status: DocumentTemplateStatus;

    @ApiProperty({
        description: '문서 HTML 템플릿',
        example: '<html>...</html>',
    })
    template: string;

    @ApiPropertyOptional({
        description: '카테고리 ID',
        example: 'uuid',
    })
    categoryId?: string;

    @ApiPropertyOptional({
        description: '카테고리 정보',
        type: CategoryResponseDto,
    })
    category?: CategoryResponseDto;

    @ApiPropertyOptional({
        description: '결재단계 템플릿 목록',
        type: [ApprovalStepTemplateResponseDto],
    })
    approvalStepTemplates?: ApprovalStepTemplateResponseDto[];

    @ApiProperty({
        description: '생성일',
        example: '2025-11-11T00:00:00.000Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: '수정일',
        example: '2025-11-11T00:00:00.000Z',
    })
    updatedAt: Date;
}

/**
 * 템플릿 생성 응답 DTO
 */
export class CreateTemplateResponseDto {
    @ApiProperty({
        description: '문서 템플릿 정보',
        type: DocumentTemplateResponseDto,
    })
    documentTemplate: DocumentTemplateResponseDto;

    @ApiProperty({
        description: '결재단계 템플릿 목록',
        type: [ApprovalStepTemplateResponseDto],
    })
    approvalSteps: ApprovalStepTemplateResponseDto[];
}
