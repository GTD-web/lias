import { SchedulerRegistry } from '@nestjs/schedule';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
import { Reservation } from '@libs/entities';
import { DeleteReservationClosingJobUsecase } from './delete-reservation-closing-job.usecase';
export declare class CreateReservationClosingJobUsecase {
    private readonly schedulerRegistry;
    private readonly reservationService;
    private readonly deleteReservationClosingJob;
    constructor(schedulerRegistry: SchedulerRegistry, reservationService: DomainReservationService, deleteReservationClosingJob: DeleteReservationClosingJobUsecase);
    execute(reservation: Reservation): Promise<void>;
}
