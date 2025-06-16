import { NotificationType } from '@libs/enums/notification-type.enum';
import { CreateNotificationDataDto, CreateNotificationDto } from '../dtos/create-notification.dto';
export declare class CreateNotificationUsecase {
    constructor();
    execute(notificationType: NotificationType, createNotificationDatatDto: CreateNotificationDataDto): Promise<CreateNotificationDto>;
}
