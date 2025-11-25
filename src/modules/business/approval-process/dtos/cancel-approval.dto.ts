import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString } from 'class-validator';

/**
 * 결재 취소 DTO
 */
export class CancelApprovalDto {
    @ApiProperty({
        description: '문서 ID',
        example: 'uuid',
    })
    @IsUUID()
    documentId: string;

    // @ApiProperty({
    //     description: '취소 요청자 ID (기안자 또는 가장 최근에 결재를 완료한 결재자)',
    //     example: 'uuid',
    // })
    // @IsUUID()
    // requesterId: string;

    @ApiProperty({
        description: '취소 사유',
        example: '내용 수정이 필요하여 취소합니다.',
    })
    @IsString()
    reason: string;
}
