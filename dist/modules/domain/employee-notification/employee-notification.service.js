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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEmployeeNotificationService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("@libs/services/base.service");
const employee_notification_repository_1 = require("./employee-notification.repository");
let DomainEmployeeNotificationService = class DomainEmployeeNotificationService extends base_service_1.BaseService {
    constructor(employeeNotificationRepository) {
        super(employeeNotificationRepository);
        this.employeeNotificationRepository = employeeNotificationRepository;
    }
    async findByEmployeeId(employeeId) {
        return await this.employeeNotificationRepository.findAll({
            where: { employeeId },
            relations: ['notification'],
            order: { notification: { createdAt: 'DESC' } },
        });
    }
    async markAsRead(employeeNotificationId) {
        const notification = await this.findOne({ where: { employeeNotificationId } });
        if (!notification) {
            throw new common_1.NotFoundException('알림을 찾을 수 없습니다.');
        }
        return await this.update(employeeNotificationId, { isRead: true });
    }
    async deleteByNotificationId(notificationId) {
        await this.employeeNotificationRepository.deleteByNotificationId(notificationId);
    }
};
exports.DomainEmployeeNotificationService = DomainEmployeeNotificationService;
exports.DomainEmployeeNotificationService = DomainEmployeeNotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [employee_notification_repository_1.DomainEmployeeNotificationRepository])
], DomainEmployeeNotificationService);
//# sourceMappingURL=employee-notification.service.js.map