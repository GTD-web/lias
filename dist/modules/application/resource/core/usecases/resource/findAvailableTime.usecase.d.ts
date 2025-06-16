import { DomainResourceService } from '@src/domain/resource/resource.service';
import { ResourceQueryDto } from '@src/application/resource/core/dtos/resource-query.dto';
import { ResourceAvailabilityDto } from '@src/application/resource/core/dtos/available-time-response.dto';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
export declare class FindAvailableTimeUsecase {
    private readonly resourceService;
    private readonly reservationService;
    constructor(resourceService: DomainResourceService, reservationService: DomainReservationService);
    execute(query: ResourceQueryDto): Promise<ResourceAvailabilityDto[]>;
    private calculateAvailableTimeSlots;
    private processTimeRange;
    private isSameOrBefore;
    private isBefore;
    private isAfter;
    private isSameOrAfter;
}
