import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { SendNotificationDto, SendNotificationResponseDto } from './dtos/send-notification.dto';
import { NOTIFICATION_SERVICE_URL, NOTIFICATION_ENDPOINTS } from './notification.constants';

/**
 * 알림 서비스
 *
 * 포털 알림 서버와 통신하여 FCM 푸시 알림을 전송합니다.
 */
@Injectable()
export class NotificationService {
    private readonly logger = new Logger(NotificationService.name);
    private readonly baseUrl: string;

    constructor(private readonly httpService: HttpService) {
        this.baseUrl = NOTIFICATION_SERVICE_URL;
        this.logger.log(`알림 서비스 초기화 완료. Base URL: ${this.baseUrl}`);
    }

    /**
     * 공통 HTTP 헤더 생성
     * @param authorization 요청에서 전달받은 Authorization 헤더
     * @returns HTTP 헤더 객체
     */
    private getHeaders(authorization?: string): Record<string, string> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (authorization) {
            headers['Authorization'] = authorization;
        }

        return headers;
    }

    /**
     * 알림 전송
     *
     * @param dto 알림 전송 요청 데이터
     * @param authorization Authorization 헤더 (선택)
     * @returns 알림 전송 결과
     */
    async sendNotification(dto: SendNotificationDto, authorization?: string): Promise<SendNotificationResponseDto> {
        // 유효성 검증
        this.validateRequest(dto);

        const url = `${this.baseUrl}${NOTIFICATION_ENDPOINTS.SEND}`;

        this.logger.debug(`알림 전송 요청: ${dto.recipientIds.length}명, 제목: ${dto.title}`);

        try {
            const response = await firstValueFrom(
                this.httpService.post<SendNotificationResponseDto>(url, dto, {
                    headers: this.getHeaders(authorization),
                    timeout: 30000, // 30초 타임아웃
                }),
            );

            this.logger.log(
                `알림 전송 완료: 성공 ${response.data.successCount}건, 실패 ${response.data.failureCount}건`,
            );

            return response.data;
        } catch (error) {
            this.logger.error('알림 전송 실패', error);

            // HTTP 에러 처리
            if (error.response) {
                throw new HttpException(
                    error.response.data?.message || '알림 전송 중 오류가 발생했습니다.',
                    error.response.status || HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }

            // 네트워크 에러 또는 기타 에러
            throw new HttpException('알림 서버와 통신 중 오류가 발생했습니다.', HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    /**
     * 요청 데이터 유효성 검증
     */
    private validateRequest(dto: SendNotificationDto): void {
        // recipientIds와 tokens 길이 일치 검증
        if (dto.recipientIds.length !== dto.tokens.length) {
            throw new HttpException(
                '수신자 ID 목록과 FCM 토큰 목록의 길이가 일치하지 않습니다.',
                HttpStatus.BAD_REQUEST,
            );
        }

        // 최대 500개 제한 확인
        if (dto.recipientIds.length > 500) {
            throw new HttpException('한 번에 최대 500개의 알림까지 전송할 수 있습니다.', HttpStatus.BAD_REQUEST);
        }

        // 최소 1명 이상
        if (dto.recipientIds.length === 0) {
            throw new HttpException('최소 1명 이상의 수신자가 필요합니다.', HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * FCM 토큰과 함께 여러 명에게 알림 전송 (간편 메서드)
     *
     * @param sender 발신자 ID
     * @param title 알림 제목
     * @param content 알림 내용
     * @param recipientIds 수신자 ID 목록
     * @param tokens FCM 토큰 목록
     * @param options 추가 옵션 (sourceSystem, linkUrl, metadata, authorization)
     */
    async sendToMultiple(
        sender: string,
        title: string,
        content: string,
        recipientIds: string[],
        tokens: string[],
        options?: {
            sourceSystem?: string;
            linkUrl?: string;
            metadata?: Record<string, any>;
            authorization?: string;
        },
    ): Promise<SendNotificationResponseDto> {
        return this.sendNotification(
            {
                sender,
                title,
                content,
                recipientIds,
                tokens,
                sourceSystem: options?.sourceSystem || 'portal',
                linkUrl: options?.linkUrl,
                metadata: options?.metadata,
            },
            options?.authorization,
        );
    }
}
