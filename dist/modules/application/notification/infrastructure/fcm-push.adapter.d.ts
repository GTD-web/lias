import { ConfigService } from '@nestjs/config';
import { BatchResponse } from 'firebase-admin/messaging';
import { PushSubscriptionDto } from '@src/application/notification/dtos/push-subscription.dto';
import { PushNotificationPayload } from '@src/application/notification/dtos/send-notification.dto';
import { PushNotificationSendResult } from '@src/application/notification/dtos/response-notification.dto';
export declare class FCMAdapter {
    private readonly configService;
    constructor(configService: ConfigService);
    isProduction: boolean;
    sendNotification(subscription: PushSubscriptionDto, payload: PushNotificationPayload): Promise<PushNotificationSendResult>;
    sendBulkNotification(subscriptions: PushSubscriptionDto[], payload: PushNotificationPayload): Promise<BatchResponse>;
    sendTestNotification(subscription: PushSubscriptionDto, payload: any): Promise<{
        success: boolean;
        message: string;
        error: any;
    }>;
}
