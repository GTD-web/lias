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
exports.CreateReminderNotificationUsecase = void 0;
const common_1 = require("@nestjs/common");
const reservation_service_1 = require("@src/domain/reservation/reservation.service");
const date_util_1 = require("@libs/utils/date.util");
const notification_type_enum_1 = require("@libs/enums/notification-type.enum");
const resource_type_enum_1 = require("@libs/enums/resource-type.enum");
let CreateReminderNotificationUsecase = class CreateReminderNotificationUsecase {
    constructor(reservationService) {
        this.reservationService = reservationService;
    }
    async execute(createNotificationDatatDto) {
        const now = date_util_1.DateUtil.now().toDate();
        const reservation = await this.reservationService.findOne({
            where: {
                reservationId: createNotificationDatatDto.reservationId,
            },
        });
        const diffInMilliseconds = reservation.startDate.getTime() - now.getTime();
        const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
        const days = Math.floor(diffInMinutes / (24 * 60));
        const hours = Math.floor((diffInMinutes % (24 * 60)) / 60);
        const minutes = diffInMinutes % 60;
        const parts = [];
        if (diffInMilliseconds > 0) {
            switch (createNotificationDatatDto.resourceType) {
                case resource_type_enum_1.ResourceType.MEETING_ROOM:
                    parts.push('회의 시작까지');
                    break;
                case resource_type_enum_1.ResourceType.VEHICLE:
                    parts.push('차량 이용 시작까지');
                    break;
                case resource_type_enum_1.ResourceType.ACCOMMODATION:
                    parts.push('입실 까지');
                    break;
                case resource_type_enum_1.ResourceType.EQUIPMENT:
                    parts.push('장비 이용 시작까지');
                    break;
            }
            if (days > 0) {
                parts.push(`${days}일`);
            }
            if (hours > 0) {
                parts.push(`${hours}시간`);
            }
            if (minutes > 0 || parts.length === 0) {
                parts.push(`${minutes}분`);
            }
            parts.push('남았습니다.');
        }
        else {
            switch (createNotificationDatatDto.resourceType) {
                case resource_type_enum_1.ResourceType.MEETING_ROOM:
                    parts.push('회의 참여 알림');
                    break;
                case resource_type_enum_1.ResourceType.VEHICLE:
                    parts.push('차량 탑승 알림');
                    break;
                case resource_type_enum_1.ResourceType.ACCOMMODATION:
                    parts.push('입실 알림');
                    break;
                case resource_type_enum_1.ResourceType.EQUIPMENT:
                    parts.push('장비 이용 알림');
                    break;
            }
        }
        const timeDifferencePhrase = parts.join(' ');
        return {
            title: `[${createNotificationDatatDto.reservationTitle}]\n${timeDifferencePhrase}`,
            body: createNotificationDatatDto.reservationDate,
            notificationType: notification_type_enum_1.NotificationType.RESERVATION_DATE_UPCOMING,
            notificationData: createNotificationDatatDto,
            createdAt: date_util_1.DateUtil.now().format('YYYY-MM-DD HH:mm'),
            isSent: true,
        };
    }
};
exports.CreateReminderNotificationUsecase = CreateReminderNotificationUsecase;
exports.CreateReminderNotificationUsecase = CreateReminderNotificationUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof reservation_service_1.DomainReservationService !== "undefined" && reservation_service_1.DomainReservationService) === "function" ? _a : Object])
], CreateReminderNotificationUsecase);
//# sourceMappingURL=createReminderNotification.usecase.js.map