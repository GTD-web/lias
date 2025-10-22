import { IsNotEmpty, IsUUID, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RejectStepRequestDto {
    @ApiProperty({
        description: '결재 단계 스냅샷 ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsNotEmpty()
    @IsUUID()
    stepSnapshotId: string;

    @ApiProperty({
        description: '반려 사유 (필수)',
        example: '예산안이 부적절합니다',
    })
    @IsNotEmpty()
    @IsString()
    comment: string;
}
