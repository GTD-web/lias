import { HandleCronUsecase } from '../usecases/handle-cron.usecase';
export declare class CronReservationService {
    private readonly handleCronUsecase;
    constructor(handleCronUsecase: HandleCronUsecase);
    closeReservation(): Promise<void>;
}
