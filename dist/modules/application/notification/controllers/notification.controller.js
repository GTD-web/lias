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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const user_decorator_1 = require("@libs/decorators/user.decorator");
const entities_1 = require("@libs/entities");
const paginate_query_dto_1 = require("@libs/dtos/paginate-query.dto");
const role_decorator_1 = require("@libs/decorators/role.decorator");
const role_type_enum_1 = require("@libs/enums/role-type.enum");
const api_responses_decorator_1 = require("@libs/decorators/api-responses.decorator");
const push_subscription_dto_1 = require("../dtos/push-subscription.dto");
const response_notification_dto_1 = require("../dtos/response-notification.dto");
const create_notification_dto_1 = require("../dtos/create-notification.dto");
const send_notification_dto_1 = require("../dtos/send-notification.dto");
const notification_service_1 = require("../services/notification.service");
let NotificationController = class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async subscribe(user, subscription) {
        await this.notificationService.subscribe(user, subscription);
    }
    async sendSuccess(body) {
        await this.notificationService.sendDirectNotification(body.subscription, body.payload);
    }
    async send(sendNotificationDto) {
        await this.notificationService.sendReminderNotification(sendNotificationDto.notificationType, sendNotificationDto.notificationData, sendNotificationDto.notificationTarget);
    }
    async findAllByEmployeeId(employeeId, query) {
        return await this.notificationService.findMyNotifications(employeeId, query);
    }
    async markAsRead(user, notificationId) {
        await this.notificationService.markAsRead(user.employeeId, notificationId);
    }
    async findSubscription(token, employeeId) {
        return await this.notificationService.findSubscription(token, employeeId);
    }
};
exports.NotificationController = NotificationController;
__decorate([
    (0, common_1.Post)('subscribe'),
    (0, swagger_1.ApiOperation)({ summary: '웹 푸시 구독' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '웹 푸시 구독 성공',
    }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _a : Object, push_subscription_dto_1.PushSubscriptionDto]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "subscribe", null);
__decorate([
    (0, common_1.Post)('subscribe/success'),
    (0, swagger_1.ApiOperation)({ summary: '웹 푸시 구독 성공' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '웹 푸시 구독 성공',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_notification_dto_1.PushNotificationDto]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "sendSuccess", null);
__decorate([
    (0, common_1.Post)('send'),
    (0, swagger_1.ApiOperation)({ summary: '웹 푸시 알림 전송' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '웹 푸시 알림 전송 성공',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_notification_dto_1.SendNotificationDto]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "send", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '알람 목록 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '알람 목록 조회 성공',
        type: [response_notification_dto_1.ResponseNotificationDto],
        isPaginated: true,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        type: Number,
        required: false,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        type: Number,
        required: false,
    }),
    __param(0, (0, user_decorator_1.User)('employeeId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof paginate_query_dto_1.PaginationQueryDto !== "undefined" && paginate_query_dto_1.PaginationQueryDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "findAllByEmployeeId", null);
__decorate([
    (0, common_1.Patch)(':notificationId/read'),
    (0, swagger_1.ApiOperation)({ summary: '알람 읽음 처리' }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('notificationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof entities_1.Employee !== "undefined" && entities_1.Employee) === "function" ? _c : Object, String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Get)('subscription'),
    (0, swagger_1.ApiOperation)({ summary: '구독 정보 조회' }),
    (0, api_responses_decorator_1.ApiDataResponse)({
        status: 200,
        description: '구독 정보 조회 성공',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'token',
        type: String,
        required: false,
        description: '구독 토큰',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'employeeId',
        type: String,
        required: false,
        description: '직원 ID',
    }),
    __param(0, (0, common_1.Query)('token')),
    __param(1, (0, common_1.Query)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "findSubscription", null);
exports.NotificationController = NotificationController = __decorate([
    (0, swagger_1.ApiTags)('5. 알림 '),
    (0, common_1.Controller)('v1/notifications'),
    (0, role_decorator_1.Roles)(role_type_enum_1.Role.USER),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationController);
//# sourceMappingURL=notification.controller.js.map