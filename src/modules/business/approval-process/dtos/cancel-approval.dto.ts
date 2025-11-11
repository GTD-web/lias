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

    @ApiProperty({
        description: '기안자 ID',
        example: 'uuid',
    })
    @IsUUID()
    drafterId: string;

    @ApiProperty({
        description: '취소 사유',
        example: '내용 수정이 필요하여 취소합니다.',
    })
    @IsString()
    reason: string;
}

