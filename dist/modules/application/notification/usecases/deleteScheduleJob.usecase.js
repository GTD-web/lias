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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteScheduleJobUsecase = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const notification_type_enum_1 = require("@libs/enums/notification-type.enum");
const typeorm_1 = require("typeorm");
const employee_notification_service_1 = require("@src/domain/employee-notification/employee-notification.service");
const notification_service_1 = require("@src/domain/notification/notification.service");
let DeleteScheduleJobUsecase = class DeleteScheduleJobUsecase {
    constructor(schedulerRegistry, notificationService, employeeNotificationService) {
        this.schedulerRegistry = schedulerRegistry;
        this.notificationService = notificationService;
        this.employeeNotificationService = employeeNotificationService;
    }
    async execute(createNotificationData) {
        const notifications = await this.notificationService.findAll({
            where: {
                notificationType: notification_type_enum_1.NotificationType.RESERVATION_DATE_UPCOMING,
                notificationData: (0, typeorm_1.Raw)((alias) => `${alias} ->> 'reservationId' = '${createNotificationData.reservationId}'`),
                isSent: false,
            },
        });
        for (const notification of notifications) {
            try {
                const jobName = `upcoming-${notification.notificationId}}`;
                this.schedulerRegistry.deleteCronJob(jobName);
            }
            catch (error) {
                console.error(`Failed to delete cron job ${notification.notificationId}: ${error}`);
            }
            await this.employeeNotificationService.deleteByNotificationId(notification.notificationId);
            await this.notificationService.delete(notification.notificationId);
        }
    }
};
exports.DeleteScheduleJobUsecase = DeleteScheduleJobUsecase;
exports.DeleteScheduleJobUsecase = DeleteScheduleJobUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof schedule_1.SchedulerRegistry !== "undefined" && schedule_1.SchedulerRegistry) === "function" ? _a : Object, typeof (_b = typeof notification_service_1.DomainNotificationService !== "undefined" && notification_service_1.DomainNotificationService) === "function" ? _b : Object, typeof (_c = typeof employee_notification_service_1.DomainEmployeeNotificationService !== "undefined" && employee_notification_service_1.DomainEmployeeNotificationService) === "function" ? _c : Object])
], DeleteScheduleJobUsecase);
//# sourceMappingURL=deleteScheduleJob.usecase.js.map