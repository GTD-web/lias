import { Employee } from '@libs/entities';
import { DomainResourceService } from '@src/domain/resource/resource.service';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
export declare class GetTaskStatusUsecase {
    private readonly resourceService;
    private readonly reservationService;
    constructor(resourceService: DomainResourceService, reservationService: DomainReservationService);
    execute(user: Employee): Promise<{
        title: string;
    }>;
}
