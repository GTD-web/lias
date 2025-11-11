import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsString, IsOptional, IsObject } from 'class-validator';

/**
 * 시행 완료 DTO
 */
export class CompleteImplementationDto {
    @ApiProperty({
        description: '시행 단계 스냅샷 ID',
        example: 'uuid',
    })
    @IsUUID()
    stepSnapshotId: string;

    @ApiProperty({
        description: '시행자 ID',
        example: 'uuid',
    })
    @IsUUID()
    implementerId: string;

    @ApiPropertyOptional({
        description: '시행 의견',
        example: '시행 완료했습니다.',
    })
    @IsOptional()
    @IsString()
    comment?: string;

    @ApiPropertyOptional({
        description: '시행 결과 데이터',
        example: { result: '완료', amount: 100000 },
    })
    @IsOptional()
    @IsObject()
    resultData?: Record<string, any>;
}
