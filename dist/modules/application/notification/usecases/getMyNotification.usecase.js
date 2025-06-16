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
exports.GetMyNotificationUsecase = void 0;
const common_1 = require("@nestjs/common");
const notification_service_1 = require("@src/domain/notification/notification.service");
let GetMyNotificationUsecase = class GetMyNotificationUsecase {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async execute(employeeId, query) {
        const options = {
            where: {
                employees: { employeeId },
                isSent: true,
            },
        };
        const total = await this.notificationService.count({
            where: options.where,
        });
        if (query) {
            options.skip = query.getOffset();
            options.take = query.limit;
        }
        const notifications = await this.notificationService.findAll({
            ...options,
            relations: ['employees'],
            order: {
                createdAt: 'DESC',
            },
        });
        return {
            items: notifications.map((notification) => {
                return {
                    notificationId: notification.notificationId,
                    title: notification.title,
                    body: notification.body,
                    notificationData: notification.notificationData,
                    notificationType: notification.notificationType,
                    createdAt: notification.createdAt,
                    isRead: notification.employees.find((employee) => employee.employeeId === employeeId).isRead,
                };
            }),
            meta: {
                total,
                page: query.page,
                limit: query.limit,
                hasNext: query.page * query.limit < total,
            },
        };
    }
};
exports.GetMyNotificationUsecase = GetMyNotificationUsecase;
exports.GetMyNotificationUsecase = GetMyNotificationUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof notification_service_1.DomainNotificationService !== "undefined" && notification_service_1.DomainNotificationService) === "function" ? _a : Object])
], GetMyNotificationUsecase);
//# sourceMappingURL=getMyNotification.usecase.js.map