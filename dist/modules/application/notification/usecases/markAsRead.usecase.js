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
exports.MarkAsReadUsecase = void 0;
const common_1 = require("@nestjs/common");
const employee_notification_service_1 = require("@src/domain/employee-notification/employee-notification.service");
let MarkAsReadUsecase = class MarkAsReadUsecase {
    constructor(employeeNotificationService) {
        this.employeeNotificationService = employeeNotificationService;
    }
    async execute(employeeId, notificationId) {
        const employeeNotification = await this.employeeNotificationService.findOne({
            where: {
                employeeId,
                notificationId,
            },
        });
        if (!employeeNotification) {
            throw new common_1.BadRequestException('There is no data');
        }
        await this.employeeNotificationService.update(employeeNotification.employeeNotificationId, {
            isRead: true,
        });
    }
};
exports.MarkAsReadUsecase = MarkAsReadUsecase;
exports.MarkAsReadUsecase = MarkAsReadUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof employee_notification_service_1.DomainEmployeeNotificationService !== "undefined" && employee_notification_service_1.DomainEmployeeNotificationService) === "function" ? _a : Object])
], MarkAsReadUsecase);
//# sourceMappingURL=markAsRead.usecase.js.map