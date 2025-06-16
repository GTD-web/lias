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
exports.PushSubscriptionDto = exports.WebPushDto = exports.FCMDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class FCMDto {
}
exports.FCMDto = FCMDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FCMDto.prototype, "token", void 0);
class WebPushDto {
}
exports.WebPushDto = WebPushDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], WebPushDto.prototype, "endpoint", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'object',
        properties: {
            auth: { type: 'string' },
            p256dh: { type: 'string' },
        },
    }),
    __metadata("design:type", Object)
], WebPushDto.prototype, "keys", void 0);
class PushSubscriptionDto {
}
exports.PushSubscriptionDto = PushSubscriptionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: FCMDto, required: false }),
    __metadata("design:type", FCMDto)
], PushSubscriptionDto.prototype, "fcm", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: WebPushDto, required: false }),
    __metadata("design:type", WebPushDto)
], PushSubscriptionDto.prototype, "webPush", void 0);
//# sourceMappingURL=push-subscription.dto.js.map