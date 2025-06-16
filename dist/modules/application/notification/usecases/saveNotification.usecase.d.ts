import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { Notification } from '@libs/entities';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';
import { DomainEmployeeNotificationService } from '@src/domain/employee-notification/employee-notification.service';
import { DomainNotificationService } from '@src/domain/notification/notification.service';
export declare class SaveNotificationUsecase {
    private readonly notificationService;
    private readonly employeeNotificationService;
    constructor(notificationService: DomainNotificationService, employeeNotificationService: DomainEmployeeNotificationService);
    execute(createNotificationDto: CreateNotificationDto, notiTarget: string[], repositoryOptions?: IRepositoryOptions<Notification>): Promise<any>;
}
