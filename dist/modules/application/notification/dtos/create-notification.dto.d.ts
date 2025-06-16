import { NotificationData } from '@libs/entities/notification.entity';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { ResourceType } from '@libs/enums/resource-type.enum';
export declare class CreateNotificationDataDto implements NotificationData {
    reservationId?: string;
    reservationTitle?: string;
    reservationDate?: string;
    beforeMinutes?: number;
    resourceId?: string;
    resourceName: string;
    resourceType: ResourceType;
    consumableName?: string;
}
export declare class CreateNotificationDto {
    title: string;
    body: string;
    notificationData: CreateNotificationDataDto;
    createdAt?: string;
    isSent?: boolean;
    notificationType: NotificationType;
}
export declare class CreateEmployeeNotificationDto {
    employeeId: string;
    notificationId: string;
}
export declare class SendNotificationDto {
    notificationType: NotificationType;
    notificationData: CreateNotificationDataDto;
    notificationTarget: string[];
}
