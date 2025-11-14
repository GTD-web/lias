import { ApiProperty } from '@nestjs/swagger';

/**
 * 내가 기안한 문서 통계 DTO
 */
export class MyDocumentsStatisticsDto {
    @ApiProperty({
        description: '임시저장 (DRAFT)',
        example: 3,
    })
    draft: number;

    @ApiProperty({
        description: '상신 (전체 제출된 문서)',
        example: 8,
    })
    submitted: number;

    @ApiProperty({
        description: '협의 (PENDING + AGREEMENT)',
        example: 6,
    })
    agreement: number;

    @ApiProperty({
        description: '미결 (PENDING + APPROVAL)',
        example: 2,
    })
    approval: number;

    @ApiProperty({
        description: '기결 (APPROVED)',
        example: 0,
    })
    approved: number;

    @ApiProperty({
        description: '반려 (REJECTED)',
        example: 0,
    })
    rejected: number;

    @ApiProperty({
        description: '시행 (IMPLEMENTED)',
        example: 0,
    })
    implemented: number;
}

/**
 * 다른 사람이 기안한 문서 통계 DTO
 */
export class OthersDocumentsStatisticsDto {
    @ApiProperty({
        description: '참조 (내가 참조자로 있는 문서)',
        example: 0,
    })
    reference: number;
}

/**
 * 문서 통계 응답 DTO
 */
export class DocumentStatisticsResponseDto {
    @ApiProperty({
        description: '내가 기안한 문서 통계',
        type: MyDocumentsStatisticsDto,
    })
    myDocuments: MyDocumentsStatisticsDto;

    @ApiProperty({
        description: '다른 사람이 기안한 문서 통계',
        type: OthersDocumentsStatisticsDto,
    })
    othersDocuments: OthersDocumentsStatisticsDto;
}
