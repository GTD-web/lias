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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const subscribe_usecase_1 = require("../usecases/subscribe.usecase");
const sendMultiNotification_usecase_1 = require("../usecases/sendMultiNotification.usecase");
const getMyNotification_usecase_1 = require("../usecases/getMyNotification.usecase");
const markAsRead_usecase_1 = require("../usecases/markAsRead.usecase");
const createNotification_usecase_1 = require("../usecases/createNotification.usecase");
const notification_type_enum_1 = require("@libs/enums/notification-type.enum");
const saveNotification_usecase_1 = require("../usecases/saveNotification.usecase");
const createScheduleJob_usecase_1 = require("../usecases/createScheduleJob.usecase");
const getSubscriptions_usecase_1 = require("../usecases/getSubscriptions.usecase");
const deleteScheduleJob_usecase_1 = require("../usecases/deleteScheduleJob.usecase");
const notification_service_1 = require("@src/domain/notification/notification.service");
const getSubscriptionInfo_usecase_1 = require("../usecases/getSubscriptionInfo.usecase");
const createReminderNotification_usecase_1 = require("../usecases/createReminderNotification.usecase");
let NotificationService = class NotificationService {
    constructor(subscribeUsecase, sendMultiNotificationUsecase, getMyNotificationUsecase, markAsReadUsecase, createNotificationUsecase, saveNotificationUsecase, createScheduleJobUsecase, getSubscriptionsUsecase, deleteScheduleJobUsecase, notificationService, getSubscriptionInfoUsecase, createReminderNotificationUsecase) {
        this.subscribeUsecase = subscribeUsecase;
        this.sendMultiNotificationUsecase = sendMultiNotificationUsecase;
        this.getMyNotificationUsecase = getMyNotificationUsecase;
        this.markAsReadUsecase = markAsReadUsecase;
        this.createNotificationUsecase = createNotificationUsecase;
        this.saveNotificationUsecase = saveNotificationUsecase;
        this.createScheduleJobUsecase = createScheduleJobUsecase;
        this.getSubscriptionsUsecase = getSubscriptionsUsecase;
        this.deleteScheduleJobUsecase = deleteScheduleJobUsecase;
        this.notificationService = notificationService;
        this.getSubscriptionInfoUsecase = getSubscriptionInfoUsecase;
        this.createReminderNotificationUsecase = createReminderNotificationUsecase;
    }
    async onModuleInit() {
    }
    async subscribe(user, subscription) {
        await this.subscribeUsecase.execute(user.employeeId, subscription);
    }
    async sendDirectNotification(subscription, payload) {
        await this.sendMultiNotificationUsecase.execute([subscription], payload);
    }
    async findMyNotifications(employeeId, query) {
        return await this.getMyNotificationUsecase.execute(employeeId, query);
    }
    async markAsRead(employeeId, notificationId) {
        return await this.markAsReadUsecase.execute(employeeId, notificationId);
    }
    async findSubscription(token, employeeId) {
        if (!token && !employeeId) {
            return null;
        }
        if (employeeId) {
            const subscriptions = await this.getSubscriptionInfoUsecase.executeByEmployeeId(employeeId);
            return subscriptions;
        }
        const subscriptions = await this.getSubscriptionInfoUsecase.executeByToken(token);
        return subscriptions;
    }
    async createNotification(notificationType, createNotificationDatatDto, notiTarget, repositoryOptions) {
        notiTarget = Array.from(new Set(notiTarget));
        const notificationDto = await this.createNotificationUsecase.execute(notificationType, createNotificationDatatDto);
        const notification = await this.saveNotificationUsecase.execute(notificationDto, notiTarget, repositoryOptions);
        const totalSubscriptions = [];
        for (const employeeId of notiTarget) {
            const subscriptions = await this.getSubscriptionsUsecase.execute(employeeId);
            totalSubscriptions.push(...subscriptions);
        }
        switch (notificationType) {
            case notification_type_enum_1.NotificationType.RESERVATION_DATE_UPCOMING:
                break;
            default:
                await this.sendMultiNotificationUsecase.execute(totalSubscriptions, {
                    title: notification.title,
                    body: notification.body,
                    notificationType: notification.notificationType,
                    notificationData: notification.notificationData,
                });
                break;
        }
    }
    async sendReminderNotification(notificationType, createNotificationDatatDto, notiTarget) {
        const createNotificationDto = await this.createReminderNotificationUsecase.execute(createNotificationDatatDto);
        if (!createNotificationDto) {
            return;
        }
        const notification = await this.saveNotificationUsecase.execute(createNotificationDto, notiTarget);
        const totalSubscriptions = [];
        for (const employeeId of notiTarget) {
            const subscriptions = await this.getSubscriptionsUsecase.execute(employeeId);
            totalSubscriptions.push(...subscriptions);
        }
        await this.sendMultiNotificationUsecase.execute(totalSubscriptions, {
            title: notification.title,
            body: notification.body,
            notificationType: notification.notificationType,
            notificationData: notification.notificationData,
        });
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [subscribe_usecase_1.SubscribeUsecase,
        sendMultiNotification_usecase_1.SendMultiNotificationUsecase,
        getMyNotification_usecase_1.GetMyNotificationUsecase,
        markAsRead_usecase_1.MarkAsReadUsecase,
        createNotification_usecase_1.CreateNotificationUsecase,
        saveNotification_usecase_1.SaveNotificationUsecase,
        createScheduleJob_usecase_1.CreateScheduleJobUsecase,
        getSubscriptions_usecase_1.GetSubscriptionsUsecase,
        deleteScheduleJob_usecase_1.DeleteScheduleJobUsecase, typeof (_a = typeof notification_service_1.DomainNotificationService !== "undefined" && notification_service_1.DomainNotificationService) === "function" ? _a : Object, getSubscriptionInfo_usecase_1.GetSubscriptionInfoUsecase,
        createReminderNotification_usecase_1.CreateReminderNotificationUsecase])
], NotificationService);
//# sourceMappingURL=notification.service.js.map