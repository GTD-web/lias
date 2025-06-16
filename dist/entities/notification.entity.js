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
exports.Notification = void 0;
const typeorm_1 = require("typeorm");
const employee_notification_entity_1 = require("./employee-notification.entity");
const notification_type_enum_1 = require("@libs/enums/notification-type.enum");
let Notification = class Notification {
};
exports.Notification = Notification;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        generated: 'uuid',
    }),
    __metadata("design:type", String)
], Notification.prototype, "notificationId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Notification.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: notification_type_enum_1.NotificationType,
        nullable: true,
    }),
    __metadata("design:type", typeof (_a = typeof notification_type_enum_1.NotificationType !== "undefined" && notification_type_enum_1.NotificationType) === "function" ? _a : Object)
], Notification.prototype, "notificationType", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Notification.prototype, "notificationData", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Notification.prototype, "isSent", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Notification.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employee_notification_entity_1.EmployeeNotification, (notification) => notification.notification),
    __metadata("design:type", Array)
], Notification.prototype, "employees", void 0);
exports.Notification = Notification = __decorate([
    (0, typeorm_1.Entity)('notifications')
], Notification);
//# sourceMappingURL=notification.entity.js.map