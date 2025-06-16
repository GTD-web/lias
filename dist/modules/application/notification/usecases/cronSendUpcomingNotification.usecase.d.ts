import { DomainNotificationService } from '@src/domain/notification/notification.service';
import { FCMAdapter } from '../infrastructure/fcm-push.adapter';
import { GetSubscriptionsUsecase } from './getSubscriptions.usecase';
export declare class CronSendUpcomingNotificationUsecase {
    private readonly notificationService;
    private readonly FCMAdapter;
    private readonly getSubscriptionsUsecase;
    constructor(notificationService: DomainNotificationService, FCMAdapter: FCMAdapter, getSubscriptionsUsecase: GetSubscriptionsUsecase);
    execute(): Promise<void>;
}
