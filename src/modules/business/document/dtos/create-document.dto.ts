import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsObject, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApprovalStepSnapshotItemDto } from './approval-step-snapshot.dto';

/**
 * 문서 생성 DTO (임시저장)
 */
export class CreateDocumentDto {
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
        description: '결재단계 스냅샷 목록 (임시저장 시 결재선 미리 설정 가능)',
        type: [ApprovalStepSnapshotItemDto],
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ApprovalStepSnapshotItemDto)
    approvalSteps?: ApprovalStepSnapshotItemDto[];
}
