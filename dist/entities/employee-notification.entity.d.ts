import { Employee } from './employee.entity';
import { Notification } from './notification.entity';
export declare class EmployeeNotification {
    employeeNotificationId: string;
    employeeId: string;
    notificationId: string;
    isRead: boolean;
    notification: Notification;
    employee: Employee;
}
