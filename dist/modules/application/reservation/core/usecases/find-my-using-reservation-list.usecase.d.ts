import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { PaginationData } from '@libs/dtos/paginate-response.dto';
import { ReservationWithRelationsResponseDto } from '../dtos/reservation-response.dto';
export declare class FindMyUsingReservationListUsecase {
    private readonly reservationService;
    constructor(reservationService: DomainReservationService);
    execute(employeeId: string): Promise<PaginationData<ReservationWithRelationsResponseDto>>;
}
