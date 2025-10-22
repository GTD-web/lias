import { IsNotEmpty, IsUUID, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CompleteAgreementRequestDto {
    @ApiProperty({
        description: '협의 단계 스냅샷 ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsNotEmpty()
    @IsUUID()
    stepSnapshotId: string;

    @ApiProperty({
        description: '협의 의견',
        example: '검토 완료했습니다',
        required: false,
    })
    @IsOptional()
    @IsString()
    comment?: string;
}
