"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("@libs/entities");
const notification_module_1 = require("@src/domain/notification/notification.module");
const employee_notification_module_1 = require("@src/domain/employee-notification/employee-notification.module");
const notification_service_1 = require("@src/application/notification/services/notification.service");
const notification_controller_1 = require("@src/application/notification/controllers/notification.controller");
const fcm_push_adapter_1 = require("@src/application/notification/infrastructure/fcm-push.adapter");
const employee_module_1 = require("@src/domain/employee/employee.module");
const usecases_1 = require("./usecases");
const schedule_1 = require("@nestjs/schedule");
const config_1 = require("@nestjs/config");
const env_config_1 = require("@libs/configs/env.config");
const cron_notification_controller_1 = require("./controllers/cron.notification.controller");
const cron_notification_service_1 = require("./services/cron-notification.service");
const reservation_module_1 = require("@src/domain/reservation/reservation.module");
let NotificationModule = class NotificationModule {
};
exports.NotificationModule = NotificationModule;
exports.NotificationModule = NotificationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.Employee, entities_1.Notification, entities_1.EmployeeNotification, entities_1.Reservation]),
            config_1.ConfigModule.forFeature(env_config_1.FIREBASE_CONFIG),
            schedule_1.ScheduleModule.forRoot(),
            employee_module_1.DomainEmployeeModule,
            employee_notification_module_1.DomainEmployeeNotificationModule,
            notification_module_1.DomainNotificationModule,
            reservation_module_1.DomainReservationModule,
        ],
        providers: [
            notification_service_1.NotificationService,
            cron_notification_service_1.CronNotificationService,
            fcm_push_adapter_1.FCMAdapter,
            usecases_1.SubscribeUsecase,
            usecases_1.SendMultiNotificationUsecase,
            usecases_1.GetMyNotificationUsecase,
            usecases_1.MarkAsReadUsecase,
            usecases_1.SaveNotificationUsecase,
            usecases_1.CreateNotificationUsecase,
            usecases_1.CreateScheduleJobUsecase,
            usecases_1.GetSubscriptionsUsecase,
            usecases_1.DeleteScheduleJobUsecase,
            usecases_1.GetSubscriptionInfoUsecase,
            usecases_1.CronSendUpcomingNotificationUsecase,
            usecases_1.CreateReminderNotificationUsecase,
        ],
        controllers: [notification_controller_1.NotificationController, cron_notification_controller_1.CronNotificationController],
        exports: [notification_service_1.NotificationService],
    })
], NotificationModule);
//# sourceMappingURL=notification.module.js.map