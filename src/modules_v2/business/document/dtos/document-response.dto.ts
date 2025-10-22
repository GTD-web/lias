import { ApiProperty } from '@nestjs/swagger';
import { DocumentStatus } from '../../../../common/enums/approval.enum';

export class DocumentResponseDto {
    @ApiProperty({ description: '문서 ID' })
    id: string;

    @ApiProperty({ description: '문서 양식 ID' })
    formId: string;

    @ApiProperty({ description: '문서 양식 버전 ID' })
    formVersionId: string;

    @ApiProperty({ description: '문서 제목' })
    title: string;

    @ApiProperty({ description: '기안자 ID' })
    drafterId: string;

    @ApiProperty({ description: '기안 부서 ID', required: false })
    drafterDepartmentId?: string;

    @ApiProperty({ description: '문서 상태', enum: DocumentStatus })
    status: DocumentStatus;

    @ApiProperty({ description: '문서 내용 (HTML 또는 문자열)', required: false })
    content?: string;

    @ApiProperty({ description: '메타데이터 (JSON)', required: false })
    metadata?: Record<string, any>;

    @ApiProperty({ description: '문서 번호', required: false })
    documentNumber?: string;

    @ApiProperty({ description: '결재선 스냅샷 ID', required: false })
    approvalLineSnapshotId?: string;

    @ApiProperty({ description: '제출 일시', required: false })
    submittedAt?: Date;

    @ApiProperty({ description: '취소 사유', required: false })
    cancelReason?: string;

    @ApiProperty({ description: '취소 일시', required: false })
    cancelledAt?: Date;

    @ApiProperty({ description: '생성 일시' })
    createdAt: Date;

    @ApiProperty({ description: '수정 일시' })
    updatedAt: Date;
}
