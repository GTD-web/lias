import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { SSOService } from '../../integrations/sso/sso.service';
import { NotificationService } from '../../integrations/notification/notification.service';
import {
    SendNotificationDto,
    SendNotificationResponseDto,
    SendNotificationToEmployeeDto,
} from './dtos/notification.dto';
import { SendNotificationDto as IntegrationSendNotificationDto } from '../../integrations/notification/dtos/send-notification.dto';

/**
 * 알림 컨텍스트
 *
 * SSO 모듈과 Notification 모듈을 조합하여
 * FCM 토큰을 자동으로 조회하고 알림을 전송합니다.
 *
 * 역할:
 * - 직원 ID로부터 FCM 토큰 자동 조회
 * - 단일/다수 직원에게 알림 전송
 * - Authorization 헤더 자동 전달
 * - 에러 핸들링 및 로깅
 */
@Injectable()
export class NotificationContext {
    private readonly logger = new Logger(NotificationContext.name);

    constructor(
        private readonly ssoService: SSOService,
        private readonly notificationService: NotificationService,
    ) {}

    /**
     * 여러 직원에게 알림 전송
     *
     * @param dto 알림 전송 요청 데이터
     * @returns 알림 전송 결과
     */
    async sendNotification(dto: SendNotificationDto): Promise<SendNotificationResponseDto> {
        this.logger.log(`알림 전송 시작: ${dto.recipientEmployeeIds.length}명, 제목: ${dto.title}`);

        // 1) 유효성 검증
        this.validateSendNotificationDto(dto);

        try {
            // 2) FCM 토큰 조회
            const fcmResponse = await this.ssoService.getMultipleFcmTokens({
                employeeIds: dto.recipientEmployeeIds,
            });

            this.logger.debug(`FCM 토큰 조회 완료: ${fcmResponse.totalTokens || 0}개`);

            // 3) FCM 토큰이 없는 경우 처리
            if (!fcmResponse.allTokens || fcmResponse.allTokens.length === 0) {
                this.logger.warn('알림을 받을 수 있는 FCM 토큰이 없습니다.');
                return {
                    success: false,
                    message: '알림을 받을 수 있는 FCM 토큰이 없습니다.',
                    notificationIds: [],
                    successCount: 0,
                    failureCount: dto.recipientEmployeeIds.length,
                };
            }

            // 4) FCM 토큰 추출 (allTokens에서 fcmToken만 추출)
            const { byEmployee } = fcmResponse;

            const employeeTokens = byEmployee.filter((employee) =>
                employee.tokens.some((token) => token.deviceType === 'prod'),
            );
            const tokens = employeeTokens.map((employee) => employee.tokens.map((token) => token.fcmToken)).flat();
            const recipientIds = fcmResponse.allTokens.map((tokenInfo) => tokenInfo.employeeNumber);

            // 5) 알림 전송 요청 DTO 생성
            const notificationDto: IntegrationSendNotificationDto = {
                sender: dto.sender,
                title: dto.title,
                content: dto.content,
                recipientIds: recipientIds,
                tokens: tokens,
                sourceSystem: 'LIAS',
                linkUrl: dto.linkUrl,
                metadata: dto.metadata,
            };

            // 6) 알림 전송
            const result = await this.notificationService.sendNotification(notificationDto, dto.authorization);

            this.logger.log(`알림 전송 완료: 성공 ${result.successCount}건, 실패 ${result.failureCount}건`);

            return result;
        } catch (error) {
            this.logger.error('알림 전송 실패', error);
            throw error;
        }
    }

    /**
     * 단일 직원에게 알림 전송
     *
     * @param dto 알림 전송 요청 데이터
     * @returns 알림 전송 결과
     */
    async sendNotificationToEmployee(dto: SendNotificationToEmployeeDto): Promise<SendNotificationResponseDto> {
        this.logger.log(`단일 알림 전송 시작: ${dto.recipientEmployeeId}, 제목: ${dto.title}`);

        // 1) 유효성 검증
        this.validateSendNotificationToEmployeeDto(dto);

        try {
            // 2) FCM 토큰 조회
            const fcmResponse = await this.ssoService.getFcmToken({
                employeeId: dto.recipientEmployeeId,
            });

            this.logger.debug(`FCM 토큰 조회 완료: ${fcmResponse.tokens?.length || 0}개`);

            // 3) FCM 토큰이 없는 경우 처리
            if (!fcmResponse.tokens || fcmResponse.tokens.length === 0) {
                this.logger.warn(`FCM 토큰이 등록되지 않음: ${dto.recipientEmployeeId}`);
                return {
                    success: false,
                    message: 'FCM 토큰이 등록되지 않음',
                    notificationIds: [],
                    successCount: 0,
                    failureCount: 1,
                };
            }

            // 4) FCM 토큰 추출 (첫 번째 토큰 사용)
            const employeeTokens = fcmResponse;
            const recipientIds = employeeTokens.employeeNumber;
            const tokens = employeeTokens.tokens
                .filter((token) => token.deviceType === 'prod')
                .map((token) => token.fcmToken);

            // 5) 알림 전송 요청 DTO 생성
            const notificationDto: IntegrationSendNotificationDto = {
                sender: dto.sender,
                title: dto.title,
                content: dto.content,
                recipientIds: [recipientIds],
                tokens: tokens,
                sourceSystem: 'LIAS',
                linkUrl: dto.linkUrl,
                metadata: dto.metadata,
            };

            // 6) 알림 전송
            const result = await this.notificationService.sendNotification(notificationDto, dto.authorization);

            this.logger.log(`단일 알림 전송 완료: ${result.successCount > 0 ? '성공' : '실패'}`);

            return result;
        } catch (error) {
            this.logger.error('단일 알림 전송 실패', error);
            throw error;
        }
    }

    /**
     * 헬퍼: 여러 직원 알림 전송 DTO 유효성 검증
     */
    private validateSendNotificationDto(dto: SendNotificationDto): void {
        if (!dto.sender || dto.sender.trim().length === 0) {
            throw new BadRequestException('발신자(sender)는 필수입니다.');
        }

        if (!dto.title || dto.title.trim().length === 0) {
            throw new BadRequestException('제목(title)은 필수입니다.');
        }

        if (!dto.content || dto.content.trim().length === 0) {
            throw new BadRequestException('본문(content)은 필수입니다.');
        }

        if (!dto.recipientEmployeeIds || dto.recipientEmployeeIds.length === 0) {
            throw new BadRequestException('수신자(recipientEmployeeIds)는 최소 1명 이상이어야 합니다.');
        }

        // 중복 제거
        const uniqueRecipients = [...new Set(dto.recipientEmployeeIds)];
        if (uniqueRecipients.length !== dto.recipientEmployeeIds.length) {
            this.logger.warn('중복된 수신자가 있어 제거되었습니다.');
            dto.recipientEmployeeIds = uniqueRecipients;
        }
    }

    /**
     * 헬퍼: 단일 직원 알림 전송 DTO 유효성 검증
     */
    private validateSendNotificationToEmployeeDto(dto: SendNotificationToEmployeeDto): void {
        if (!dto.sender || dto.sender.trim().length === 0) {
            throw new BadRequestException('발신자(sender)는 필수입니다.');
        }

        if (!dto.title || dto.title.trim().length === 0) {
            throw new BadRequestException('제목(title)은 필수입니다.');
        }

        if (!dto.content || dto.content.trim().length === 0) {
            throw new BadRequestException('본문(content)은 필수입니다.');
        }

        if (!dto.recipientEmployeeId || dto.recipientEmployeeId.trim().length === 0) {
            throw new BadRequestException('수신자(recipientEmployeeId)는 필수입니다.');
        }
    }

    /**
     * 헬퍼: 직원 정보로부터 알림 발신자 이름 생성
     *
     * @param employee 직원 정보 (JWT에서 추출된 정보)
     * @returns 발신자 이름
     */
    getSenderName(employee: { name?: string; employeeNumber?: string }): string {
        return employee.name || employee.employeeNumber || '시스템';
    }

    /**
     * 헬퍼: Authorization 헤더 생성
     *
     * @param accessToken 액세스 토큰
     * @returns Bearer 형식의 Authorization 헤더
     */
    getAuthorizationHeader(accessToken: string): string {
        if (accessToken.startsWith('Bearer ')) {
            return accessToken;
        }
        return `Bearer ${accessToken}`;
    }
}
