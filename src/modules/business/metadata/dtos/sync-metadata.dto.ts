import { ApiProperty } from '@nestjs/swagger';

export class SyncMetadataResponseDto {
    @ApiProperty({ description: '성공 여부' })
    success: boolean;

    @ApiProperty({ description: '메시지' })
    message: string;

    @ApiProperty({ description: '동기화된 데이터 개수' })
    syncedCounts: {
        departments: number;
        employees: number;
        positions: number;
        ranks: number;
        employeeDepartmentPositions: number;
    };

    @ApiProperty({ description: '동기화 완료 시각' })
    syncedAt: Date;
}
