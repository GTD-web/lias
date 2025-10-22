import { ApiProperty } from '@nestjs/swagger';
import { ApprovalStatus, ApprovalStepType } from '../../../../common/enums/approval.enum';

export class ApprovalStepResponseDto {
    @ApiProperty({ description: '결재 단계 스냅샷 ID' })
    id: string;

    @ApiProperty({ description: '결재선 스냅샷 ID' })
    snapshotId: string;

    @ApiProperty({ description: '단계 순서' })
    stepOrder: number;

    @ApiProperty({ description: '단계 유형', enum: ApprovalStepType })
    stepType: ApprovalStepType;

    @ApiProperty({ description: '결재자 ID' })
    approverId: string;

    @ApiProperty({ description: '결재자 이름', required: false })
    approverName?: string;

    @ApiProperty({ description: '결재자 부서 ID', required: false })
    approverDepartmentId?: string;

    @ApiProperty({ description: '결재자 부서명', required: false })
    approverDepartmentName?: string;

    @ApiProperty({ description: '결재자 직위 ID', required: false })
    approverPositionId?: string;

    @ApiProperty({ description: '결재자 직책명', required: false })
    approverPositionTitle?: string;

    @ApiProperty({ description: 'Assignee Rule', required: false })
    assigneeRule?: string;

    @ApiProperty({ description: '상태', enum: ApprovalStatus })
    status: ApprovalStatus;

    @ApiProperty({ description: '결재 의견', required: false })
    comment?: string;

    @ApiProperty({ description: '승인/반려 일시', required: false })
    approvedAt?: Date;

    @ApiProperty({ description: '필수 결재 여부', required: false })
    isRequired?: boolean;

    @ApiProperty({ description: '결재 단계 설명', required: false })
    description?: string;

    @ApiProperty({ description: '생성 일시' })
    createdAt: Date;

    // 문서 정보 추가
    @ApiProperty({ description: '문서 ID', required: false })
    documentId?: string;

    @ApiProperty({ description: '문서 제목', required: false })
    documentTitle?: string;

    @ApiProperty({ description: '문서 번호', required: false })
    documentNumber?: string;

    @ApiProperty({ description: '기안자 ID', required: false })
    drafterId?: string;

    @ApiProperty({ description: '기안자 이름', required: false })
    drafterName?: string;

    @ApiProperty({ description: '기안자 부서명', required: false })
    drafterDepartmentName?: string;

    @ApiProperty({ description: '문서 상태', required: false })
    documentStatus?: string;

    @ApiProperty({ description: '제출 일시', required: false })
    submittedAt?: Date;
}

export class DocumentApprovalStatusResponseDto {
    @ApiProperty({ description: '문서 ID' })
    documentId: string;

    @ApiProperty({ description: '결재 단계 목록', type: [ApprovalStepResponseDto] })
    steps: ApprovalStepResponseDto[];

    @ApiProperty({ description: '전체 단계 수' })
    totalSteps: number;

    @ApiProperty({ description: '완료된 단계 수' })
    completedSteps: number;
}
