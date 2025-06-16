import { SchedulerRegistry } from '@nestjs/schedule';
export declare class DeleteReservationClosingJobUsecase {
    private readonly schedulerRegistry;
    constructor(schedulerRegistry: SchedulerRegistry);
    execute(reservationId: string): void;
}
