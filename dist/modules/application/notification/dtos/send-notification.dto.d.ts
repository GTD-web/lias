import { PushSubscriptionDto } from './push-subscription.dto';
import { NotificationData } from '@libs/entities/notification.entity';
import { NotificationType } from '@libs/enums/notification-type.enum';
export declare class PushNotificationPayload {
    title: string;
    body: string;
    notificationType: NotificationType;
    notificationData: NotificationData;
}
export declare class PushNotificationDto {
    payload: PushNotificationPayload;
    subscription: PushSubscriptionDto;
}
