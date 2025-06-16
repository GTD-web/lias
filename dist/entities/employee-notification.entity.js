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
exports.EmployeeNotification = void 0;
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("./employee.entity");
const notification_entity_1 = require("./notification.entity");
let EmployeeNotification = class EmployeeNotification {
};
exports.EmployeeNotification = EmployeeNotification;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        generated: 'uuid',
    }),
    __metadata("design:type", String)
], EmployeeNotification.prototype, "employeeNotificationId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmployeeNotification.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EmployeeNotification.prototype, "notificationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], EmployeeNotification.prototype, "isRead", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => notification_entity_1.Notification),
    (0, typeorm_1.JoinColumn)({ name: 'notificationId' }),
    __metadata("design:type", notification_entity_1.Notification)
], EmployeeNotification.prototype, "notification", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employeeId' }),
    __metadata("design:type", employee_entity_1.Employee)
], EmployeeNotification.prototype, "employee", void 0);
exports.EmployeeNotification = EmployeeNotification = __decorate([
    (0, typeorm_1.Entity)('employee_notifications')
], EmployeeNotification);
//# sourceMappingURL=employee-notification.entity.js.map