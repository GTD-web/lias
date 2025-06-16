import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { PaginationData } from '@libs/dtos/paginate-response.dto';
import { GroupedReservationResponseDto } from '../dtos/reservation-response.dto';
import { ResourceType } from '@libs/enums/resource-type.enum';
export declare class FindMyReservationListUsecase {
    private readonly reservationService;
    constructor(reservationService: DomainReservationService);
    execute(employeeId: string, page?: number, limit?: number, resourceType?: ResourceType, startDate?: string, endDate?: string): Promise<PaginationData<GroupedReservationResponseDto>>;
}
