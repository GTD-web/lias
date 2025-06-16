"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateScheduleJobUsecase = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const dist_1 = require("cron/dist");
const notification_service_1 = require("@src/domain/notification/notification.service");
const fcm_push_adapter_1 = require("../infrastructure/fcm-push.adapter");
let CreateScheduleJobUsecase = class CreateScheduleJobUsecase {
    constructor(schedulerRegistry, notificationService, FCMAdapter) {
        this.schedulerRegistry = schedulerRegistry;
        this.notificationService = notificationService;
        this.FCMAdapter = FCMAdapter;
    }
    async execute(notification, subscriptions) {
        const jobName = `upcoming-${notification.notificationId}`;
        const notificationDate = new Date(notification.createdAt);
        if (notificationDate.getTime() <= Date.now()) {
            console.log(`Notification time ${notificationDate} is in the past, skipping cron job creation`);
            return;
        }
        const job = new dist_1.CronJob(notificationDate, async () => {
            try {
                await this.FCMAdapter.sendBulkNotification(subscriptions, {
                    title: notification.title,
                    body: notification.body,
                    notificationType: notification.notificationType,
                    notificationData: notification.notificationData,
                });
            }
            catch (error) {
                console.error(`Failed to send notification: ${error}`);
            }
            finally {
                await this.notificationService.update(notification.notificationId, { isSent: true });
            }
        });
        this.schedulerRegistry.addCronJob(jobName, job);
        console.log(Array.from(this.schedulerRegistry.getCronJobs().keys()));
        job.start();
    }
};
exports.CreateScheduleJobUsecase = CreateScheduleJobUsecase;
exports.CreateScheduleJobUsecase = CreateScheduleJobUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof schedule_1.SchedulerRegistry !== "undefined" && schedule_1.SchedulerRegistry) === "function" ? _a : Object, typeof (_b = typeof notification_service_1.DomainNotificationService !== "undefined" && notification_service_1.DomainNotificationService) === "function" ? _b : Object, fcm_push_adapter_1.FCMAdapter])
], CreateScheduleJobUsecase);
//# sourceMappingURL=createScheduleJob.usecase.js.map