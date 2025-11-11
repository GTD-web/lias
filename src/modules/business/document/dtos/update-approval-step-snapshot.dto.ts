import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsEnum, IsUUID, IsOptional, IsObject } from 'class-validator';
import { ApprovalStepType, ApprovalStatus } from '../../../../common/enums/approval.enum';
import { ApproverSnapshotMetadata } from '../../../../modules/domain/approval-step-snapshot/approval-step-snapshot.entity';
import { ApprovalStepSnapshotItemDto } from './approval-step-snapshot.dto';

/**
 * 결재단계 스냅샷 수정 DTO (문서 수정 시 사용)
 */
export class UpdateApprovalStepSnapshotItemDto extends ApprovalStepSnapshotItemDto {
    @ApiPropertyOptional({
        description: '결재단계 스냅샷 ID (수정 시 필요, 없으면 새로 생성)',
        example: 'uuid',
    })
    @IsOptional()
    @IsUUID()
    id?: string;
}

