import { SchedulerRegistry } from '@nestjs/schedule';
import { CreateNotificationDataDto } from '../dtos/create-notification.dto';
import { DomainEmployeeNotificationService } from '@src/domain/employee-notification/employee-notification.service';
import { DomainNotificationService } from '@src/domain/notification/notification.service';
export declare class DeleteScheduleJobUsecase {
    private readonly schedulerRegistry;
    private readonly notificationService;
    private readonly employeeNotificationService;
    constructor(schedulerRegistry: SchedulerRegistry, notificationService: DomainNotificationService, employeeNotificationService: DomainEmployeeNotificationService);
    execute(createNotificationData: CreateNotificationDataDto): Promise<void>;
}
