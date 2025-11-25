import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsString, IsOptional } from 'class-validator';

/**
 * 협의 완료 DTO
 */
export class CompleteAgreementDto {
    @ApiProperty({
        description: '협의 단계 스냅샷 ID',
        example: 'uuid',
    })
    @IsUUID()
    stepSnapshotId: string;

    // @ApiProperty({
    //     description: '협의자 ID',
    //     example: 'uuid',
    // })
    // @IsUUID()
    // agreerId: string;

    @ApiPropertyOptional({
        description: '협의 의견',
        example: '협의 완료합니다.',
    })
    @IsOptional()
    @IsString()
    comment?: string;
}
