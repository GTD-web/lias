import { Employee } from '@libs/entities';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { DomainResourceService } from '@src/domain/resource/resource.service';
export declare class GetTaskListUsecase {
    private readonly resourceService;
    private readonly reservationService;
    constructor(resourceService: DomainResourceService, reservationService: DomainReservationService);
    execute(user: Employee): Promise<{
        totalCount: number;
        items: any[];
    }>;
}
