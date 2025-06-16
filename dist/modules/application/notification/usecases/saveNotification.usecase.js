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
exports.SaveNotificationUsecase = void 0;
const common_1 = require("@nestjs/common");
const employee_notification_service_1 = require("@src/domain/employee-notification/employee-notification.service");
const notification_service_1 = require("@src/domain/notification/notification.service");
let SaveNotificationUsecase = class SaveNotificationUsecase {
    constructor(notificationService, employeeNotificationService) {
        this.notificationService = notificationService;
        this.employeeNotificationService = employeeNotificationService;
    }
    async execute(createNotificationDto, notiTarget, repositoryOptions) {
        const notification = await this.notificationService.save(createNotificationDto, repositoryOptions);
        for (const employeeId of notiTarget) {
            await this.employeeNotificationService.save({
                employeeId: employeeId,
                notificationId: notification.notificationId,
            }, repositoryOptions);
        }
        return notification;
    }
};
exports.SaveNotificationUsecase = SaveNotificationUsecase;
exports.SaveNotificationUsecase = SaveNotificationUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof notification_service_1.DomainNotificationService !== "undefined" && notification_service_1.DomainNotificationService) === "function" ? _a : Object, typeof (_b = typeof employee_notification_service_1.DomainEmployeeNotificationService !== "undefined" && employee_notification_service_1.DomainEmployeeNotificationService) === "function" ? _b : Object])
], SaveNotificationUsecase);
//# sourceMappingURL=saveNotification.usecase.js.map