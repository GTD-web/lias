import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { CalendarResponseDto } from '../dtos/reservation-response.dto';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { Employee } from '@libs/entities/employee.entity';
import { DomainNotificationService } from '@src/domain/notification/notification.service';
export declare class FindCalendarUsecase {
    private readonly reservationService;
    private readonly notificationService;
    constructor(reservationService: DomainReservationService, notificationService: DomainNotificationService);
    execute(user: Employee, startDate: string, endDate: string, resourceType?: ResourceType, isMine?: boolean): Promise<CalendarResponseDto>;
}
