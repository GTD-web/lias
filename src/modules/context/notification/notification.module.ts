import { Module } from '@nestjs/common';
import { NotificationContext } from './notification.context';
import { SSOModule } from '../../integrations/sso/sso.module';
import { NotificationModule as NotificationIntegrationModule } from '../../integrations/notification/notification.module';

/**
 * 알림 컨텍스트 모듈
 *
 * SSO 모듈과 Notification 모듈을 통합하여
 * FCM 토큰 조회 및 알림 전송 기능을 제공합니다.
 */
@Module({
    imports: [
        SSOModule, // SSO 통합 모듈 (FCM 토큰 조회)
        NotificationIntegrationModule, // 알림 통합 모듈 (알림 전송)
    ],
    providers: [NotificationContext],
    exports: [NotificationContext],
})
export class NotificationContextModule {}

