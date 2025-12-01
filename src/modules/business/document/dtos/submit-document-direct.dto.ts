import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsObject, ValidateNested, IsArray } from 'class-validator';
import { ApprovalStepSnapshotItemDto } from './approval-step-snapshot.dto';
import { Type } from 'class-transformer';

/**
 * 바로 기안 DTO (임시저장 없이 바로 기안)
 * 내부적으로 임시저장 후 기안하는 방식으로 처리됩니다.
 */
export class SubmitDocumentDirectDto {
    @ApiPropertyOptional({
        description: '문서 템플릿 ID (선택사항: 템플릿 없는 외부 문서 지원)',
        example: 'uuid',
    })
    @IsOptional()
    @IsUUID()
    documentTemplateId?: string;

    @ApiProperty({
        description: '문서 제목',
        example: '휴가 신청서',
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: '문서 내용 (HTML 형태)',
        example: '<html>...</html>',
    })
    @IsString()
    content: string;

    // @ApiProperty({
    //     description: '기안자 ID',
    //     example: 'uuid',
    // })
    // @IsUUID()
    // drafterId: string;

    @ApiPropertyOptional({
        description: '추가 메타데이터 (금액, 날짜 등)',
        example: { amount: 100000, date: '2025-01-01' },
    })
    @IsOptional()
    @IsObject()
    metadata?: Record<string, any>;

    @ApiPropertyOptional({
        description: '결재단계 스냅샷 목록 (기안 시 결재선 설정, 없으면 기존 스냅샷 사용)',
        type: [ApprovalStepSnapshotItemDto],
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ApprovalStepSnapshotItemDto)
    approvalSteps?: ApprovalStepSnapshotItemDto[];
}
