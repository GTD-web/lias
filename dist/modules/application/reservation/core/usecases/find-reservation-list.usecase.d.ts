import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { ReservationWithRelationsResponseDto } from '../dtos/reservation-response.dto';
import { ResourceType } from '@libs/enums/resource-type.enum';
export declare class FindReservationListUsecase {
    private readonly reservationService;
    constructor(reservationService: DomainReservationService);
    execute(startDate?: string, endDate?: string, resourceType?: ResourceType, resourceId?: string, status?: string[]): Promise<ReservationWithRelationsResponseDto[]>;
}
