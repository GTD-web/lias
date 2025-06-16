import { Notification } from '@libs/entities/notification.entity';
import { BaseService } from '@libs/services/base.service';
import { DomainNotificationRepository } from './notification.repository';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';
export declare class DomainNotificationService extends BaseService<Notification> {
    private readonly notificationRepository;
    constructor(notificationRepository: DomainNotificationRepository);
    count(repositoryOptions: IRepositoryOptions<Notification>): Promise<number>;
}
