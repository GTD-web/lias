import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString } from 'class-validator';

/**
 * 결재 반려 DTO
 */
export class RejectStepDto {
    @ApiProperty({
        description: '결재 단계 스냅샷 ID',
        example: 'uuid',
    })
    @IsUUID()
    stepSnapshotId: string;

    // @ApiProperty({
    //     description: '결재자 ID',
    //     example: 'uuid',
    // })
    // @IsUUID()
    // approverId: string;

    @ApiProperty({
        description: '반려 사유 (필수)',
        example: '내용을 수정하여 재기안 바랍니다.',
    })
    @IsString()
    comment: string;
}
