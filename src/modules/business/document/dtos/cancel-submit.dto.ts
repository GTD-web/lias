import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * 상신취소 요청 DTO (기안자용)
 * 정책: 결재진행중이고 결재자가 아직 어떤 처리도 하지 않은 상태일 때만 가능
 */
export class CancelSubmitDto {
    @ApiProperty({
        description: '취소 사유',
        example: '내용 수정이 필요하여 상신을 취소합니다.',
    })
    @IsString()
    reason: string;
}

