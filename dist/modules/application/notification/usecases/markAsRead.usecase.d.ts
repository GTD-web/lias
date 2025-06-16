import { DomainEmployeeNotificationService } from '@src/domain/employee-notification/employee-notification.service';
export declare class MarkAsReadUsecase {
    private readonly employeeNotificationService;
    constructor(employeeNotificationService: DomainEmployeeNotificationService);
    execute(employeeId: string, notificationId: string): Promise<void>;
}
