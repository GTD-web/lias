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
exports.FindCalendarUsecase = void 0;
const common_1 = require("@nestjs/common");
const reservation_service_1 = require("@src/domain/reservation/reservation.service");
const typeorm_1 = require("typeorm");
const reservation_response_dto_1 = require("../dtos/reservation-response.dto");
const date_util_1 = require("@libs/utils/date.util");
const reservation_type_enum_1 = require("@libs/enums/reservation-type.enum");
const notification_service_1 = require("@src/domain/notification/notification.service");
let FindCalendarUsecase = class FindCalendarUsecase {
    constructor(reservationService, notificationService) {
        this.reservationService = reservationService;
        this.notificationService = notificationService;
    }
    async execute(user, startDate, endDate, resourceType, isMine) {
        const startDateObj = date_util_1.DateUtil.date(startDate).toDate();
        const endDateObj = date_util_1.DateUtil.date(endDate).toDate();
        const dateCondition = (0, typeorm_1.Raw)((alias) => `(${alias} BETWEEN :startDateObj AND :endDateObj OR
              "Reservation"."endDate" BETWEEN :startDateObj AND :endDateObj OR
              (${alias} <= :startDateObj AND "Reservation"."endDate" >= :endDateObj))`, { startDateObj, endDateObj });
        const where = {
            startDate: dateCondition,
            status: (0, typeorm_1.In)([reservation_type_enum_1.ReservationStatus.PENDING, reservation_type_enum_1.ReservationStatus.CONFIRMED, reservation_type_enum_1.ReservationStatus.CLOSED]),
            ...(resourceType ? { resource: { type: resourceType } } : {}),
            ...(isMine ? { participants: { employeeId: user.employeeId, type: reservation_type_enum_1.ParticipantsType.RESERVER } } : {}),
        };
        const reservations = await this.reservationService.findAll({
            where: where,
            relations: ['resource', 'participants', 'participants.employee'],
            order: {
                startDate: 'ASC',
            },
            select: {
                reservationId: true,
                startDate: true,
                endDate: true,
                title: true,
                status: true,
                resource: {
                    resourceId: true,
                    name: true,
                    type: true,
                },
                participants: {
                    employeeId: true,
                    type: true,
                    employee: {
                        employeeId: true,
                        name: true,
                    },
                },
            },
        });
        return {
            reservations: await Promise.all(reservations.map(async (reservation) => {
                const reservationResponseDto = new reservation_response_dto_1.ReservationWithRelationsResponseDto(reservation);
                const notification = await this.notificationService.findAll({
                    where: {
                        notificationData: (0, typeorm_1.Raw)((alias) => `${alias} ->> 'reservationId' = '${reservation.reservationId}'`),
                        employees: {
                            employeeId: user.employeeId,
                            isRead: false,
                        },
                    },
                    relations: ['employees'],
                });
                reservationResponseDto.hasUnreadNotification = notification.length > 0;
                console.log(`${reservation.reservationId} / ${reservation.startDate} / ${reservation.title} : ${reservationResponseDto.hasUnreadNotification}`);
                console.log(notification.map((n) => n.notificationId));
                return reservationResponseDto;
            })),
        };
    }
};
exports.FindCalendarUsecase = FindCalendarUsecase;
exports.FindCalendarUsecase = FindCalendarUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof reservation_service_1.DomainReservationService !== "undefined" && reservation_service_1.DomainReservationService) === "function" ? _a : Object, typeof (_b = typeof notification_service_1.DomainNotificationService !== "undefined" && notification_service_1.DomainNotificationService) === "function" ? _b : Object])
], FindCalendarUsecase);
//# sourceMappingURL=find-calendar.usecase.js.map