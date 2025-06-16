import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { DomainResourceService } from '@src/domain/resource/resource.service';
import { GroupedReservationWithResourceResponseDto } from '../dtos/reservation-response.dto';
export declare class FindResourceReservationListUsecase {
    private readonly reservationService;
    private readonly resourceService;
    constructor(reservationService: DomainReservationService, resourceService: DomainResourceService);
    execute(employeeId: string, resourceId: string, page?: number, limit?: number, month?: string, isMine?: boolean): Promise<GroupedReservationWithResourceResponseDto>;
}
