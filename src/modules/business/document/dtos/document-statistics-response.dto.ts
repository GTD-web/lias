import { ApiProperty } from '@nestjs/swagger';

/**
 * 문서 통계 항목 DTO
 */
export class DocumentStatisticsItemDto {
    @ApiProperty({
        description: '통계 타입',
        example: 'submitted',
    })
    type: string;

    @ApiProperty({
        description: '문서 개수',
        example: 10,
    })
    count: number;
}

/**
 * 문서 통계 응답 DTO
 */
export class DocumentStatisticsResponseDto {
    @ApiProperty({
        description: '내가 기안한 문서 통계',
        type: [DocumentStatisticsItemDto],
    })
    myDocuments: {
        submitted: number; // 상신 (전체 제출된 문서)
        agreement: number; // 협의 (PENDING + AGREEMENT)
        approval: number; // 미결 (PENDING + APPROVAL)
        approved: number; // 기결 (APPROVED)
        rejected: number; // 반려 (REJECTED)
        implemented: number; // 시행 (IMPLEMENTED)
        draft: number; // 임시저장 (DRAFT)
    };

    @ApiProperty({
        description: '다른 사람이 기안한 문서 통계',
        type: [DocumentStatisticsItemDto],
    })
    othersDocuments: {
        reference: number; // 참조 (내가 참조자로 있는 문서)
    };
}

