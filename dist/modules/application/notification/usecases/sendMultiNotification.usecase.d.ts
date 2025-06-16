import { FCMAdapter } from '@src/application/notification/infrastructure/fcm-push.adapter';
import { PushSubscriptionDto } from '../dtos/push-subscription.dto';
import { PushNotificationPayload } from '../dtos/send-notification.dto';
import { BatchResponse } from 'firebase-admin/lib/messaging/messaging-api';
export declare class SendMultiNotificationUsecase {
    private readonly FCMAdapter;
    constructor(FCMAdapter: FCMAdapter);
    execute(subscriptions: PushSubscriptionDto[], payload: PushNotificationPayload): Promise<BatchResponse>;
}
