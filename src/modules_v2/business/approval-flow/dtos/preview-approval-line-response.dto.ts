import { ApiProperty } from '@nestjs/swagger';

export class ApprovalStepPreviewDto {
    @ApiProperty({ description: '단계 순서', example: 1 })
    stepOrder: number;

    @ApiProperty({
        description: '단계 유형',
        example: 'APPROVAL',
        enum: ['AGREEMENT', 'APPROVAL', 'IMPLEMENTATION', 'REFERENCE'],
    })
    stepType: string;

    @ApiProperty({ description: '필수 여부', example: true })
    isRequired: boolean;

    @ApiProperty({ description: '결재자 직원 ID', example: '123e4567-e89b-12d3-a456-426614174001' })
    employeeId: string;

    @ApiProperty({ description: '결재자 이름', example: '홍길동' })
    employeeName: string;

    @ApiProperty({ description: '결재자 부서명', example: '개발팀', required: false })
    departmentName?: string;

    @ApiProperty({ description: '결재자 직책명', example: '팀장', required: false })
    positionTitle?: string;

    @ApiProperty({ description: 'Assignee Rule', example: 'DRAFTER_SUPERIOR' })
    assigneeRule: string;
}

export class PreviewApprovalLineResponseDto {
    @ApiProperty({ description: '결재선 템플릿 이름', example: '일반 결재선' })
    templateName: string;

    @ApiProperty({ description: '결재선 템플릿 설명', required: false })
    templateDescription?: string;

    @ApiProperty({ description: '결재 단계 목록', type: [ApprovalStepPreviewDto] })
    steps: ApprovalStepPreviewDto[];
}
