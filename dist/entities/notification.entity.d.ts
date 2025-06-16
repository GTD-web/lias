import { EmployeeNotification } from './employee-notification.entity';
import { NotificationType } from '@libs/enums/notification-type.enum';
import { ResourceType } from '@libs/enums/resource-type.enum';
export interface NotificationData {
    reservationId?: string;
    reservationTitle?: string;
    reservationDate?: string;
    beforeMinutes?: number;
    resourceId?: string;
    resourceName?: string;
    resourceType?: ResourceType;
    consumableName?: string;
}
export declare class Notification {
    notificationId: string;
    title: string;
    body: string;
    notificationType: NotificationType;
    notificationData: NotificationData;
    isSent: boolean;
    createdAt: string;
    employees: EmployeeNotification[];
}
