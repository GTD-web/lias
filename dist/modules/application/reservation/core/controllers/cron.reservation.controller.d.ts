import { CronReservationService } from '../services/cron-reservation.service';
export declare class CronReservationController {
    private readonly cronReservationService;
    constructor(cronReservationService: CronReservationService);
    closeReservation(): Promise<void>;
}
