import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { PaginationData } from '@libs/dtos/paginate-response.dto';
import { GroupedReservationResponseDto } from '../dtos/reservation-response.dto';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { PaginationQueryDto } from '@libs/dtos/paginate-query.dto';
export declare class FindMyUpcomingReservationListUsecase {
    private readonly reservationService;
    constructor(reservationService: DomainReservationService);
    execute(employeeId: string, query?: PaginationQueryDto, resourceType?: ResourceType): Promise<PaginationData<GroupedReservationResponseDto>>;
}
