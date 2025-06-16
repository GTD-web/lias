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
exports.PushNotificationDto = exports.PushNotificationPayload = void 0;
const swagger_1 = require("@nestjs/swagger");
const push_subscription_dto_1 = require("./push-subscription.dto");
const notification_entity_1 = require("@libs/entities/notification.entity");
const notification_type_enum_1 = require("@libs/enums/notification-type.enum");
class PushNotificationPayload {
}
exports.PushNotificationPayload = PushNotificationPayload;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PushNotificationPayload.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PushNotificationPayload.prototype, "body", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeof (_a = typeof notification_type_enum_1.NotificationType !== "undefined" && notification_type_enum_1.NotificationType) === "function" ? _a : Object)
], PushNotificationPayload.prototype, "notificationType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeof (_b = typeof notification_entity_1.NotificationData !== "undefined" && notification_entity_1.NotificationData) === "function" ? _b : Object)
], PushNotificationPayload.prototype, "notificationData", void 0);
class PushNotificationDto {
}
exports.PushNotificationDto = PushNotificationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: PushNotificationPayload }),
    __metadata("design:type", PushNotificationPayload)
], PushNotificationDto.prototype, "payload", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: push_subscription_dto_1.PushSubscriptionDto }),
    __metadata("design:type", push_subscription_dto_1.PushSubscriptionDto)
], PushNotificationDto.prototype, "subscription", void 0);
//# sourceMappingURL=send-notification.dto.js.map