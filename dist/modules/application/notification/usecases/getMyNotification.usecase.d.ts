import { PaginationData } from '@libs/dtos/paginate-response.dto';
import { PaginationQueryDto } from '@libs/dtos/paginate-query.dto';
import { ResponseNotificationDto } from '../dtos/response-notification.dto';
import { DomainNotificationService } from '@src/domain/notification/notification.service';
export declare class GetMyNotificationUsecase {
    private readonly notificationService;
    constructor(notificationService: DomainNotificationService);
    execute(employeeId: string, query?: PaginationQueryDto): Promise<PaginationData<ResponseNotificationDto>>;
}
