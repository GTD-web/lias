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
exports.CreateNotificationUsecase = void 0;
const notification_type_enum_1 = require("@libs/enums/notification-type.enum");
const date_util_1 = require("@libs/utils/date.util");
const common_1 = require("@nestjs/common");
let CreateNotificationUsecase = class CreateNotificationUsecase {
    constructor() { }
    async execute(notificationType, createNotificationDatatDto) {
        const createNotificationDto = {
            title: '',
            body: '',
            notificationType: notificationType,
            notificationData: createNotificationDatatDto,
            createdAt: date_util_1.DateUtil.now().format('YYYY-MM-DD HH:mm'),
            isSent: true,
        };
        switch (notificationType) {
            case notification_type_enum_1.NotificationType.RESERVATION_DATE_UPCOMING:
                createNotificationDto.title = `예약 시간이 ${createNotificationDatatDto.beforeMinutes}분 남았습니다.`;
                createNotificationDto.body = `${createNotificationDatatDto.resourceName}`;
                createNotificationDto.createdAt = date_util_1.DateUtil.parse(createNotificationDatatDto.reservationDate)
                    .addMinutes(-createNotificationDatatDto.beforeMinutes)
                    .format('YYYY-MM-DD HH:mm');
                createNotificationDto.isSent = false;
                break;
            case notification_type_enum_1.NotificationType.RESERVATION_STATUS_PENDING:
                createNotificationDto.title = `[숙소 확정 대기중] ${createNotificationDatatDto.reservationTitle}`;
                createNotificationDto.body = `${createNotificationDatatDto.reservationDate}`;
                break;
            case notification_type_enum_1.NotificationType.RESERVATION_STATUS_CONFIRMED:
                createNotificationDto.title = `[예약 확정] ${createNotificationDatatDto.reservationTitle}`;
                createNotificationDto.body = `${createNotificationDatatDto.reservationDate}`;
                break;
            case notification_type_enum_1.NotificationType.RESERVATION_STATUS_CANCELLED:
                createNotificationDto.title = `[예약 취소] ${createNotificationDatatDto.reservationTitle}`;
                createNotificationDto.body = `${createNotificationDatatDto.reservationDate}`;
                break;
            case notification_type_enum_1.NotificationType.RESERVATION_STATUS_REJECTED:
                createNotificationDto.title = `[예약 취소 (관리자)] ${createNotificationDatatDto.reservationTitle}`;
                createNotificationDto.body = `${createNotificationDatatDto.reservationDate}`;
                break;
            case notification_type_enum_1.NotificationType.RESERVATION_TIME_CHANGED:
                createNotificationDto.title = `[예약 시간 변경] ${createNotificationDatatDto.reservationTitle}`;
                createNotificationDto.body = `${createNotificationDatatDto.reservationDate}`;
                break;
            case notification_type_enum_1.NotificationType.RESERVATION_PARTICIPANT_CHANGED:
                createNotificationDto.title = `[참가자 변경] ${createNotificationDatatDto.reservationTitle}`;
                createNotificationDto.body = `${createNotificationDatatDto.reservationDate}`;
                break;
            case notification_type_enum_1.NotificationType.RESOURCE_CONSUMABLE_REPLACING:
                createNotificationDto.title = `[교체 주기 알림] ${createNotificationDatatDto.consumableName}`;
                createNotificationDto.body = `${createNotificationDatatDto.resourceName}`;
                break;
            case notification_type_enum_1.NotificationType.RESOURCE_VEHICLE_RETURNED:
                createNotificationDto.title = `[차량 반납] 차량이 반납되었습니다.`;
                createNotificationDto.body = `${createNotificationDatatDto.resourceName}`;
                break;
            case notification_type_enum_1.NotificationType.RESOURCE_MAINTENANCE_COMPLETED:
                createNotificationDto.title = `[정비 완료] ${createNotificationDatatDto.consumableName}`;
                createNotificationDto.body = `${createNotificationDatatDto.resourceName}`;
                break;
        }
        return createNotificationDto;
    }
};
exports.CreateNotificationUsecase = CreateNotificationUsecase;
exports.CreateNotificationUsecase = CreateNotificationUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CreateNotificationUsecase);
//# sourceMappingURL=createNotification.usecase.js.map