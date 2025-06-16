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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronSendUpcomingNotificationUsecase = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const date_util_1 = require("@libs/utils/date.util");
const notification_service_1 = require("@src/domain/notification/notification.service");
const fcm_push_adapter_1 = require("../infrastructure/fcm-push.adapter");
const getSubscriptions_usecase_1 = require("./getSubscriptions.usecase");
let CronSendUpcomingNotificationUsecase = class CronSendUpcomingNotificationUsecase {
    constructor(notificationService, FCMAdapter, getSubscriptionsUsecase) {
        this.notificationService = notificationService;
        this.FCMAdapter = FCMAdapter;
        this.getSubscriptionsUsecase = getSubscriptionsUsecase;
    }
    async execute() {
        const now = date_util_1.DateUtil.now().format('YYYY-MM-DD HH:mm');
        const notifications = await this.notificationService.findAll({
            where: {
                isSent: false,
                createdAt: (0, typeorm_1.LessThanOrEqual)(now),
            },
            relations: ['employees'],
        });
        for (const notification of notifications) {
            const notiTarget = notification.employees.map((employee) => employee.employeeId);
            const totalSubscriptions = [];
            for (const employeeId of notiTarget) {
                const subscriptions = await this.getSubscriptionsUsecase.execute(employeeId);
                totalSubscriptions.push(...subscriptions);
            }
            if (totalSubscriptions.length === 0) {
                continue;
            }
            try {
                await this.FCMAdapter.sendBulkNotification(totalSubscriptions, {
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
        }
    }
};
exports.CronSendUpcomingNotificationUsecase = CronSendUpcomingNotificationUsecase;
exports.CronSendUpcomingNotificationUsecase = CronSendUpcomingNotificationUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof notification_service_1.DomainNotificationService !== "undefined" && notification_service_1.DomainNotificationService) === "function" ? _a : Object, fcm_push_adapter_1.FCMAdapter,
        getSubscriptions_usecase_1.GetSubscriptionsUsecase])
], CronSendUpcomingNotificationUsecase);
//# sourceMappingURL=cronSendUpcomingNotification.usecase.js.map