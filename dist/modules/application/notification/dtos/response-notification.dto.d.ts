import { NotificationType } from '@libs/enums/notification-type.enum';
import { NotificationData } from '@libs/entities/notification.entity';
import { ResourceType } from '@libs/enums/resource-type.enum';
export declare class NotificationDataDto implements NotificationData {
    resourceId?: string;
    resourceName?: string;
    resourceType?: ResourceType;
    consumableName?: string;
    reservationId?: string;
    reservationTitle?: string;
    reservationDate?: string;
    beforeMinutes?: number;
}
export declare class ResponseNotificationDto {
    notificationId: string;
    title: string;
    body: string;
    notificationData: NotificationDataDto;
    createdAt: string;
    notificationType: NotificationType;
    isRead: boolean;
}
export declare class PushNotificationSendResult {
    success: boolean;
    message: any;
    error: string;
}
