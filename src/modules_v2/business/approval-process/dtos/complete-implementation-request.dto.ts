import { IsNotEmpty, IsUUID, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CompleteImplementationRequestDto {
    @ApiProperty({
        description: '시행 단계 스냅샷 ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsNotEmpty()
    @IsUUID()
    stepSnapshotId: string;

    @ApiProperty({
        description: '시행 결과 메모',
        example: '예산 집행 완료했습니다',
        required: false,
    })
    @IsOptional()
    @IsString()
    comment?: string;

    @ApiProperty({
        description: '시행 결과 데이터 (JSON)',
        example: { executionDate: '2025-01-15', amount: 1000000 },
        required: false,
    })
    @IsOptional()
    resultData?: any;
}
