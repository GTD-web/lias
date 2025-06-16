import { Repository } from 'typeorm';
import { Notification } from '@libs/entities/notification.entity';
import { BaseRepository } from '@libs/repositories/base.repository';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';
export declare class DomainNotificationRepository extends BaseRepository<Notification> {
    constructor(repository: Repository<Notification>);
    count(repositoryOptions: IRepositoryOptions<Notification>): Promise<number>;
}
