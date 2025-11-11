import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional, IsObject, ArrayMaxSize, ArrayMinSize } from 'class-validator';

/**
 * 알림 전송 요청 DTO
 */
export class SendNotificationDto {
    @ApiProperty({
        description: '발신자 ID (사번)',
        example: 'E2023001',
    })
    @IsString()
    sender: string;

    @ApiProperty({
        description: '알림 제목',
        example: '새로운 공지사항이 등록되었습니다',
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: '알림 내용',
        example: '인사팀에서 새로운 공지사항을 등록했습니다.',
    })
    @IsString()
    content: string;

    @ApiProperty({
        description: '수신자 사용자 ID 목록 (사번), 최대 500개',
        example: ['E2023002', 'E2023003', 'E2023004'],
        type: [String],
    })
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    @ArrayMaxSize(500)
    recipientIds: string[];

    @ApiProperty({
        description: '수신자 FCM 토큰 목록, recipientIds와 순서 일치해야 함',
        example: ['fcm_token_1', 'fcm_token_2', 'fcm_token_3'],
        type: [String],
    })
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    @ArrayMaxSize(500)
    tokens: string[];

    @ApiPropertyOptional({
        description: '소스 시스템',
        example: 'portal',
        default: 'portal',
    })
    @IsOptional()
    @IsString()
    sourceSystem?: string;

    @ApiPropertyOptional({
        description: '알림 클릭 시 이동할 URL',
        example: '/portal/announcements/123',
    })
    @IsOptional()
    @IsString()
    linkUrl?: string;

    @ApiPropertyOptional({
        description: '추가 메타데이터 (JSON)',
        example: { type: 'announcement', priority: 'high' },
    })
    @IsOptional()
    @IsObject()
    metadata?: Record<string, any>;
}

/**
 * 알림 전송 응답 DTO
 */
export class SendNotificationResponseDto {
    @ApiProperty({
        description: '성공 여부',
        example: true,
    })
    success: boolean;

    @ApiProperty({
        description: '응답 메시지',
        example: '알림 전송 완료: 성공 3건, 실패 0건',
    })
    message: string;

    @ApiProperty({
        description: '생성된 알림 ID 목록',
        example: ['22e6acc2-03be-4d69-a691-1b5c4e15e119', '33f7bdd3-14cf-5d7a-b802-2c6d5f26f22a'],
        type: [String],
    })
    notificationIds: string[];

    @ApiProperty({
        description: '성공 건수',
        example: 3,
    })
    successCount: number;

    @ApiProperty({
        description: '실패 건수',
        example: 0,
    })
    failureCount: number;
}

