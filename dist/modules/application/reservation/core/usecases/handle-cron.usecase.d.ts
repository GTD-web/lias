import { DomainReservationService } from '@src/domain/reservation/reservation.service';
export declare class HandleCronUsecase {
    private readonly reservationService;
    constructor(reservationService: DomainReservationService);
    execute(): Promise<void>;
}
