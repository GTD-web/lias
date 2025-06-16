import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { CreateNotificationDataDto, CreateNotificationDto } from '../dtos/create-notification.dto';
export declare class CreateReminderNotificationUsecase {
    private readonly reservationService;
    constructor(reservationService: DomainReservationService);
    execute(createNotificationDatatDto: CreateNotificationDataDto): Promise<CreateNotificationDto>;
}
