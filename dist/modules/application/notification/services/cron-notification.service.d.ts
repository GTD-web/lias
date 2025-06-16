import { CronSendUpcomingNotificationUsecase } from '../usecases/cronSendUpcomingNotification.usecase';
export declare class CronNotificationService {
    private readonly cronSendUpcomingNotificationUsecase;
    constructor(cronSendUpcomingNotificationUsecase: CronSendUpcomingNotificationUsecase);
    sendUpcomingNotification(): Promise<void>;
}
