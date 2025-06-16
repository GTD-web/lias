import { CronNotificationService } from '../services/cron-notification.service';
export declare class CronNotificationController {
    private readonly cronNotificationService;
    constructor(cronNotificationService: CronNotificationService);
    sendUpcomingNotification(): Promise<void>;
}
