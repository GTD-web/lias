import { Repository } from 'typeorm';
import { EmployeeNotification } from '@libs/entities/employee-notification.entity';
import { BaseRepository } from '@libs/repositories/base.repository';
export declare class DomainEmployeeNotificationRepository extends BaseRepository<EmployeeNotification> {
    constructor(repository: Repository<EmployeeNotification>);
    deleteByNotificationId(notificationId: string): Promise<void>;
}
