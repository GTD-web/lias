import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsString, IsOptional } from 'class-validator';

/**
 * 결재취소 DTO (결재자용)
 * 정책: 본인이 승인한 상태이고, 다음 단계가 처리되지 않은 상태에서만 가능
 */
export class CancelApprovalStepDto {
    @ApiProperty({
        description: '취소할 결재 단계 ID',
        example: 'uuid',
    })
    @IsUUID()
    stepSnapshotId: string;

    @ApiPropertyOptional({
        description: '취소 사유 (선택)',
        example: '결재 내용을 재검토하기 위해 취소합니다.',
    })
    @IsOptional()
    @IsString()
    reason?: string;
}

