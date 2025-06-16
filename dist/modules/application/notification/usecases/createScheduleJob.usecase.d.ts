import { SchedulerRegistry } from '@nestjs/schedule';
import { Notification } from '@libs/entities';
import { DomainNotificationService } from '@src/domain/notification/notification.service';
import { FCMAdapter } from '../infrastructure/fcm-push.adapter';
import { PushSubscriptionDto } from '../dtos/push-subscription.dto';
export declare class CreateScheduleJobUsecase {
    private readonly schedulerRegistry;
    private readonly notificationService;
    private readonly FCMAdapter;
    constructor(schedulerRegistry: SchedulerRegistry, notificationService: DomainNotificationService, FCMAdapter: FCMAdapter);
    execute(notification: Notification, subscriptions: PushSubscriptionDto[]): Promise<void>;
}
