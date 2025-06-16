import { Reservation } from '@libs/entities';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
export declare class FindConflictReservationUsecase {
    private readonly reservationService;
    constructor(reservationService: DomainReservationService);
    execute(resourceId: string, startDate: Date, endDate: Date, reservationId?: string): Promise<Reservation[]>;
}
