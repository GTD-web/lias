import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { PaginationData } from '@libs/dtos/paginate-response.dto';
import { ReservationWithRelationsResponseDto } from '../dtos/reservation-response.dto';
import { PaginationQueryDto } from '@libs/dtos/paginate-query.dto';
export declare class FindCheckReservationListUsecase {
    private readonly reservationService;
    constructor(reservationService: DomainReservationService);
    execute(query: PaginationQueryDto): Promise<PaginationData<ReservationWithRelationsResponseDto>>;
}
