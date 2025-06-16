import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { ReservationWithRelationsResponseDto } from '../dtos/reservation-response.dto';
import { Employee } from '@libs/entities';
import { DomainEmployeeNotificationService } from '@src/domain/employee-notification/employee-notification.service';
import { DomainNotificationService } from '@src/domain/notification/notification.service';
export declare class FindReservationDetailUsecase {
    private readonly reservationService;
    private readonly notificationService;
    private readonly employeeNotificationService;
    constructor(reservationService: DomainReservationService, notificationService: DomainNotificationService, employeeNotificationService: DomainEmployeeNotificationService);
    execute(user: Employee, reservationId: string): Promise<ReservationWithRelationsResponseDto>;
}
