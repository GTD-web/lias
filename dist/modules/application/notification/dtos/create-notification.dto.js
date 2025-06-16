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
exports.SendNotificationDto = exports.CreateEmployeeNotificationDto = exports.CreateNotificationDto = exports.CreateNotificationDataDto = void 0;
const notification_type_enum_1 = require("@libs/enums/notification-type.enum");
const resource_type_enum_1 = require("@libs/enums/resource-type.enum");
const swagger_1 = require("@nestjs/swagger");
class CreateNotificationDataDto {
}
exports.CreateNotificationDataDto = CreateNotificationDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '예약 ID, 예약 알림 시 필수' }),
    __metadata("design:type", String)
], CreateNotificationDataDto.prototype, "reservationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '예약 제목, 예약 알림 시 필수' }),
    __metadata("design:type", String)
], CreateNotificationDataDto.prototype, "reservationTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '예약 날짜, 예약 알림 시 필수' }),
    __metadata("design:type", String)
], CreateNotificationDataDto.prototype, "reservationDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '예약 시작 전 분 수, 예약 시간 알림 시 필수' }),
    __metadata("design:type", Number)
], CreateNotificationDataDto.prototype, "beforeMinutes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '자원 ID, 자원 알림 시 필수' }),
    __metadata("design:type", String)
], CreateNotificationDataDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, description: '자원 이름' }),
    __metadata("design:type", String)
], CreateNotificationDataDto.prototype, "resourceName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: resource_type_enum_1.ResourceType, required: true, description: '자원 타입' }),
    __metadata("design:type", typeof (_a = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _a : Object)
], CreateNotificationDataDto.prototype, "resourceType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '소모품 이름, 소모품 알림 시 필수' }),
    __metadata("design:type", String)
], CreateNotificationDataDto.prototype, "consumableName", void 0);
class CreateNotificationDto {
}
exports.CreateNotificationDto = CreateNotificationDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "body", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", CreateNotificationDataDto)
], CreateNotificationDto.prototype, "notificationData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], CreateNotificationDto.prototype, "isSent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: notification_type_enum_1.NotificationType }),
    __metadata("design:type", typeof (_b = typeof notification_type_enum_1.NotificationType !== "undefined" && notification_type_enum_1.NotificationType) === "function" ? _b : Object)
], CreateNotificationDto.prototype, "notificationType", void 0);
class CreateEmployeeNotificationDto {
}
exports.CreateEmployeeNotificationDto = CreateEmployeeNotificationDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateEmployeeNotificationDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateEmployeeNotificationDto.prototype, "notificationId", void 0);
class SendNotificationDto {
}
exports.SendNotificationDto = SendNotificationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: notification_type_enum_1.NotificationType }),
    __metadata("design:type", typeof (_c = typeof notification_type_enum_1.NotificationType !== "undefined" && notification_type_enum_1.NotificationType) === "function" ? _c : Object)
], SendNotificationDto.prototype, "notificationType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", CreateNotificationDataDto)
], SendNotificationDto.prototype, "notificationData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['1256124-ef14-4124-9124-124124124124'],
        description: '알림 수신자 목록 (employeeId)',
    }),
    __metadata("design:type", Array)
], SendNotificationDto.prototype, "notificationTarget", void 0);
//# sourceMappingURL=create-notification.dto.js.map