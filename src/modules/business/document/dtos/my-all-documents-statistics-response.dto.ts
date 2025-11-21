import { ApiProperty } from '@nestjs/swagger';

/**
 * 내가 작성한 문서 + 내가 결재해야하는 문서 통계 응답 DTO
 *
 * 사이드바 구성:
 * - DRAFT: 임시저장 (내가 기안한 문서 중 DRAFT 상태)
 * - PENDING: 상신함 (내가 기안한 제출된 전체 문서)
 * - PENDING_AGREEMENT: 합의함 (내가 협의자로 결재라인에 있는 문서, PENDING 상태)
 * - PENDING_APPROVAL: 결재함 (내가 결재자로 결재라인에 있는 문서, PENDING 상태)
 * - IMPLEMENTATION: 시행함 (내가 시행자로 결재라인에 있는 문서, APPROVED 상태 - 결재 완료, 시행 대기)
 * - APPROVED: 기결함 (내가 기안한 문서 중 IMPLEMENTED 상태 - 시행까지 완료)
 * - REJECTED: 반려함 (내가 기안한 문서 중 REJECTED 상태)
 * - RECEIVED_REFERENCE: 수신참조함 (내가 참조자로 있는 문서)
 */
export class MyAllDocumentsStatisticsResponseDto {
    @ApiProperty({
        description: '임시저장 (내가 기안한 문서 중 DRAFT 상태)',
        example: 1,
    })
    DRAFT: number;

    @ApiProperty({
        description: '상신함 (내가 기안한 문서 중 제출된 전체)',
        example: 10,
    })
    PENDING: number;

    @ApiProperty({
        description: '합의함 (내가 협의자로 결재라인에 있는 문서, PENDING 상태)',
        example: 1,
    })
    PENDING_AGREEMENT: number;

    @ApiProperty({
        description: '결재함 (내가 결재자로 결재라인에 있는 문서, PENDING 상태)',
        example: 2,
    })
    PENDING_APPROVAL: number;

    @ApiProperty({
        description: '시행함 (내가 시행자로 결재라인에 있는 문서, APPROVED 상태 - 결재 완료, 시행 대기)',
        example: 1,
    })
    IMPLEMENTATION: number;

    @ApiProperty({
        description: '기결함 (내가 기안한 문서 중 IMPLEMENTED 상태 - 시행까지 완료)',
        example: 20,
    })
    APPROVED: number;

    @ApiProperty({
        description: '반려함 (내가 기안한 문서 중 REJECTED 상태)',
        example: 3,
    })
    REJECTED: number;

    @ApiProperty({
        description: '수신참조함 (내가 참조자로 있는 문서)',
        example: 23,
    })
    RECEIVED_REFERENCE: number;
}
