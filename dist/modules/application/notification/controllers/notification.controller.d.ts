import { Employee } from '@libs/entities';
import { PaginationQueryDto } from '@libs/dtos/paginate-query.dto';
import { PaginationData } from '@libs/dtos/paginate-response.dto';
import { PushSubscriptionDto } from '../dtos/push-subscription.dto';
import { ResponseNotificationDto } from '../dtos/response-notification.dto';
import { SendNotificationDto } from '../dtos/create-notification.dto';
import { PushNotificationDto } from '../dtos/send-notification.dto';
import { NotificationService } from '../services/notification.service';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    subscribe(user: Employee, subscription: PushSubscriptionDto): Promise<void>;
    sendSuccess(body: PushNotificationDto): Promise<void>;
    send(sendNotificationDto: SendNotificationDto): Promise<void>;
    findAllByEmployeeId(employeeId: string, query: PaginationQueryDto): Promise<PaginationData<ResponseNotificationDto>>;
    markAsRead(user: Employee, notificationId: string): Promise<void>;
    findSubscription(token?: string, employeeId?: string): Promise<{
        employeeId: any;
        employeeName: any;
        subscriptions: any;
    }>;
}
