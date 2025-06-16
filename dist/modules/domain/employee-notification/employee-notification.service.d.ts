import { EmployeeNotification } from '@libs/entities/employee-notification.entity';
import { BaseService } from '@libs/services/base.service';
import { DomainEmployeeNotificationRepository } from './employee-notification.repository';
export declare class DomainEmployeeNotificationService extends BaseService<EmployeeNotification> {
    private readonly employeeNotificationRepository;
    constructor(employeeNotificationRepository: DomainEmployeeNotificationRepository);
    findByEmployeeId(employeeId: string): Promise<EmployeeNotification[]>;
    markAsRead(employeeNotificationId: string): Promise<EmployeeNotification>;
    deleteByNotificationId(notificationId: string): Promise<void>;
}
