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
exports.PushNotificationSendResult = exports.ResponseNotificationDto = exports.NotificationDataDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const notification_type_enum_1 = require("@libs/enums/notification-type.enum");
const resource_type_enum_1 = require("@libs/enums/resource-type.enum");
const class_validator_1 = require("class-validator");
class NotificationDataDto {
}
exports.NotificationDataDto = NotificationDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NotificationDataDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NotificationDataDto.prototype, "resourceName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: resource_type_enum_1.ResourceType, required: false }),
    (0, class_validator_1.IsEnum)(resource_type_enum_1.ResourceType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _a : Object)
], NotificationDataDto.prototype, "resourceType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NotificationDataDto.prototype, "consumableName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NotificationDataDto.prototype, "reservationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NotificationDataDto.prototype, "reservationTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NotificationDataDto.prototype, "reservationDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], NotificationDataDto.prototype, "beforeMinutes", void 0);
class ResponseNotificationDto {
}
exports.ResponseNotificationDto = ResponseNotificationDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResponseNotificationDto.prototype, "notificationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResponseNotificationDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResponseNotificationDto.prototype, "body", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: NotificationDataDto }),
    __metadata("design:type", NotificationDataDto)
], ResponseNotificationDto.prototype, "notificationData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResponseNotificationDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: notification_type_enum_1.NotificationType }),
    __metadata("design:type", typeof (_b = typeof notification_type_enum_1.NotificationType !== "undefined" && notification_type_enum_1.NotificationType) === "function" ? _b : Object)
], ResponseNotificationDto.prototype, "notificationType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ResponseNotificationDto.prototype, "isRead", void 0);
class PushNotificationSendResult {
}
exports.PushNotificationSendResult = PushNotificationSendResult;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], PushNotificationSendResult.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], PushNotificationSendResult.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PushNotificationSendResult.prototype, "error", void 0);
//# sourceMappingURL=response-notification.dto.js.map