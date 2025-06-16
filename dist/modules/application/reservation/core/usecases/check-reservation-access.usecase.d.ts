import { DomainReservationService } from '@src/domain/reservation/reservation.service';
export declare class CheckReservationAccessUsecase {
    private readonly reservationService;
    constructor(reservationService: DomainReservationService);
    execute(reservationId: string, employeeId: string): Promise<boolean>;
}
