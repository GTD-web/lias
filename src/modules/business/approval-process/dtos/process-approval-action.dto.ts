import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsString, IsOptional, IsEnum, IsObject } from 'class-validator';

/**
 * 결재 액션 타입
 */
export enum ApprovalActionType {
    APPROVE = 'approve',
    REJECT = 'reject',
    COMPLETE_AGREEMENT = 'complete-agreement',
    COMPLETE_IMPLEMENTATION = 'complete-implementation',
    MARK_REFERENCE_READ = 'mark-reference-read',
    CANCEL = 'cancel',
}

/**
 * 통합 결재 액션 처리 DTO
 * 승인, 반려, 협의 완료, 시행 완료, 취소를 하나의 API로 처리합니다.
 */
export class ProcessApprovalActionDto {
    @ApiProperty({
        description: '액션 타입',
        enum: ApprovalActionType,
        example: ApprovalActionType.APPROVE,
    })
    @IsEnum(ApprovalActionType)
    type: ApprovalActionType;

    // @ApiProperty({
    //     description: '처리자 ID (결재자/협의자/시행자/기안자)',
    //     example: 'uuid',
    // })
    // @IsUUID()
    // approverId: string;

    @ApiPropertyOptional({
        description:
            '결재 단계 스냅샷 ID (approve, reject, complete-agreement, complete-implementation, mark-reference-read 타입에서 필수)',
        example: 'uuid',
    })
    @IsOptional()
    @IsUUID()
    stepSnapshotId?: string;

    @ApiPropertyOptional({
        description: '문서 ID (cancel 타입에서 필수)',
        example: 'uuid',
    })
    @IsOptional()
    @IsUUID()
    documentId?: string;

    @ApiPropertyOptional({
        description: '의견 또는 사유 (reject 타입에서는 필수)',
        example: '승인합니다.',
    })
    @IsOptional()
    @IsString()
    comment?: string;

    @ApiPropertyOptional({
        description: '취소 사유 (cancel 타입에서 필수)',
        example: '내용 수정이 필요하여 취소합니다.',
    })
    @IsOptional()
    @IsString()
    reason?: string;

    @ApiPropertyOptional({
        description: '시행 결과 데이터 (complete-implementation 타입에서만 사용)',
        example: { result: '완료', amount: 100000 },
    })
    @IsOptional()
    @IsObject()
    resultData?: Record<string, any>;
}
