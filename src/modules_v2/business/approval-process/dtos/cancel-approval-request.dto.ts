import { IsNotEmpty, IsUUID, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CancelApprovalRequestDto {
    @ApiProperty({
        description: '문서 ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsNotEmpty()
    @IsUUID()
    documentId: string;

    @ApiProperty({
        description: '취소 사유 (필수)',
        example: '내용 수정이 필요합니다',
    })
    @IsNotEmpty()
    @IsString()
    reason: string;
}
