import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsEnum, IsUUID, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApprovalStepType } from '../../../../common/enums/approval.enum';

/**
 * 결재단계 스냅샷 항목 DTO
 */
export class ApprovalStepSnapshotItemDto {
    @ApiProperty({
        description: '결재 단계 순서',
        example: 1,
    })
    @IsInt()
    stepOrder: number;

    @ApiProperty({
        description: '결재 단계 타입',
        enum: ApprovalStepType,
        example: ApprovalStepType.APPROVAL,
    })
    @IsEnum(ApprovalStepType)
    stepType: ApprovalStepType;

    @ApiProperty({
        description: '결재자 ID (서버에서 이 ID를 기반으로 부서, 직책, 직급 정보를 자동 조회하여 스냅샷 생성)',
        example: 'uuid',
    })
    @IsUUID()
    approverId: string;
}
