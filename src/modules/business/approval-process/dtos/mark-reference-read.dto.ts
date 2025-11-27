import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsString, IsOptional } from 'class-validator';

/**
 * 참조 열람 확인 DTO
 */
export class MarkReferenceReadDto {
    @ApiProperty({
        description: '참조 단계 스냅샷 ID',
        example: 'uuid',
    })
    @IsUUID()
    stepSnapshotId: string;

    @ApiPropertyOptional({
        description: '열람 의견 (선택)',
        example: '확인했습니다.',
    })
    @IsOptional()
    @IsString()
    comment?: string;
}

