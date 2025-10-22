import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FormResponseDto {
    @ApiProperty({ description: '문서양식 ID' })
    id: string;

    @ApiProperty({ description: '문서양식 이름' })
    name: string;

    @ApiProperty({ description: '문서양식 코드' })
    code: string;

    @ApiPropertyOptional({ description: '문서양식 설명' })
    description?: string;

    @ApiProperty({ description: '문서양식 상태' })
    status: string;

    @ApiPropertyOptional({ description: '현재 버전 ID' })
    currentVersionId?: string;

    @ApiProperty({ description: '생성일시' })
    createdAt: Date;

    @ApiProperty({ description: '수정일시' })
    updatedAt: Date;
}

export class FormVersionResponseDto {
    @ApiProperty({ description: '문서양식 버전 ID' })
    id: string;

    @ApiProperty({ description: '문서양식 ID' })
    formId: string;

    @ApiProperty({ description: '버전 번호' })
    versionNo: number;

    @ApiProperty({ description: '활성 여부' })
    isActive: boolean;

    @ApiPropertyOptional({ description: '변경 사유' })
    changeReason?: string;

    @ApiProperty({ description: '생성일시' })
    createdAt: Date;
}

export class CreateFormResponseDto {
    @ApiProperty({ description: '생성된 문서양식', type: FormResponseDto })
    form: FormResponseDto;

    @ApiProperty({ description: '생성된 문서양식 버전', type: FormVersionResponseDto })
    formVersion: FormVersionResponseDto;

    @ApiProperty({ description: '연결된 결재선 템플릿 버전 ID' })
    lineTemplateVersionId: string;
}

export class UpdateFormVersionResponseDto {
    @ApiProperty({ description: '수정된 문서양식', type: FormResponseDto })
    form: FormResponseDto;

    @ApiProperty({ description: '새로 생성된 문서양식 버전', type: FormVersionResponseDto })
    newVersion: FormVersionResponseDto;
}

export class ApprovalLineTemplateResponseDto {
    @ApiProperty({ description: '결재선 템플릿 ID' })
    id: string;

    @ApiProperty({ description: '결재선 템플릿 이름' })
    name: string;

    @ApiPropertyOptional({ description: '결재선 템플릿 설명' })
    description?: string;

    @ApiProperty({ description: '결재선 유형 (COMMON, CUSTOM)' })
    type: string;

    @ApiProperty({ description: '조직 범위 (ALL, SPECIFIC_DEPARTMENT)' })
    orgScope: string;

    @ApiPropertyOptional({ description: '대상 부서 ID' })
    departmentId?: string;

    @ApiProperty({ description: '템플릿 상태' })
    status: string;

    @ApiPropertyOptional({ description: '현재 버전 ID' })
    currentVersionId?: string;

    @ApiProperty({ description: '생성일시' })
    createdAt: Date;

    @ApiProperty({ description: '수정일시' })
    updatedAt: Date;
}

export class ApprovalLineTemplateVersionResponseDto {
    @ApiProperty({ description: '결재선 템플릿 버전 ID' })
    id: string;

    @ApiProperty({ description: '결재선 템플릿 ID' })
    templateId: string;

    @ApiProperty({ description: '버전 번호' })
    versionNo: number;

    @ApiProperty({ description: '활성 여부' })
    isActive: boolean;

    @ApiPropertyOptional({ description: '변경 사유' })
    changeReason?: string;

    @ApiProperty({ description: '생성일시' })
    createdAt: Date;
}

export class ApprovalStepSnapshotResponseDto {
    @ApiProperty({ description: '결재 단계 스냅샷 ID' })
    id: string;

    @ApiProperty({ description: '단계 순서' })
    stepOrder: number;

    @ApiProperty({ description: '단계 유형' })
    stepType: string;

    @ApiProperty({ description: '결재자 ID' })
    approverId: string;

    @ApiPropertyOptional({ description: '결재자 부서 ID' })
    approverDepartmentId?: string;

    @ApiPropertyOptional({ description: '결재자 직책 ID' })
    approverPositionId?: string;

    @ApiProperty({ description: '필수 여부' })
    required: boolean;

    @ApiProperty({ description: '결재 상태' })
    status: string;
}

export class ApprovalSnapshotResponseDto {
    @ApiProperty({ description: '결재 스냅샷 ID' })
    id: string;

    @ApiProperty({ description: '문서 ID' })
    documentId: string;

    @ApiProperty({ description: '스냅샷 생성일시' })
    frozenAt: Date;

    @ApiPropertyOptional({ description: '결재 단계 목록', type: [ApprovalStepSnapshotResponseDto] })
    steps?: ApprovalStepSnapshotResponseDto[];
}
