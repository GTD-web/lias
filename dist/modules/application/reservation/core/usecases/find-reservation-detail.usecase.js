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
exports.FindReservationDetailUsecase = void 0;
const common_1 = require("@nestjs/common");
const reservation_service_1 = require("@src/domain/reservation/reservation.service");
const reservation_response_dto_1 = require("../dtos/reservation-response.dto");
const error_message_1 = require("@libs/constants/error-message");
const date_util_1 = require("@libs/utils/date.util");
const resource_type_enum_1 = require("@libs/enums/resource-type.enum");
const reservation_type_enum_1 = require("@libs/enums/reservation-type.enum");
const typeorm_1 = require("typeorm");
const employee_notification_service_1 = require("@src/domain/employee-notification/employee-notification.service");
const notification_service_1 = require("@src/domain/notification/notification.service");
let FindReservationDetailUsecase = class FindReservationDetailUsecase {
    constructor(reservationService, notificationService, employeeNotificationService) {
        this.reservationService = reservationService;
        this.notificationService = notificationService;
        this.employeeNotificationService = employeeNotificationService;
    }
    async execute(user, reservationId) {
        const reservation = await this.reservationService.findOne({
            where: { reservationId },
            relations: [
                'resource',
                'resource.vehicleInfo',
                'resource.meetingRoomInfo',
                'resource.accommodationInfo',
                'participants',
                'participants.employee',
                'reservationVehicles',
            ],
            withDeleted: true,
        });
        if (!reservation) {
            throw new common_1.NotFoundException(error_message_1.ERROR_MESSAGE.BUSINESS.RESERVATION.NOT_FOUND);
        }
        const reservationResponseDto = new reservation_response_dto_1.ReservationWithRelationsResponseDto(reservation);
        reservationResponseDto.isMine = reservationResponseDto.reservers.some((reserver) => reserver.employeeId === user.employeeId);
        reservationResponseDto.returnable =
            reservationResponseDto.resource.type === resource_type_enum_1.ResourceType.VEHICLE
                ? reservationResponseDto.isMine &&
                    reservationResponseDto.reservationVehicles.some((reservationVehicle) => !reservationVehicle.isReturned) &&
                    reservationResponseDto.startDate <= date_util_1.DateUtil.now().format()
                : null;
        reservationResponseDto.modifiable =
            [reservation_type_enum_1.ReservationStatus.PENDING, reservation_type_enum_1.ReservationStatus.CONFIRMED].includes(reservation.status) &&
                reservationResponseDto.isMine &&
                reservationResponseDto.endDate > date_util_1.DateUtil.now().format();
        const notifications = await this.notificationService.findAll({
            where: {
                notificationData: (0, typeorm_1.Raw)((alias) => `${alias} ->> 'reservationId' = '${reservation.reservationId}'`),
                employees: {
                    employeeId: user.employeeId,
                    isRead: false,
                },
            },
            relations: ['employees'],
        });
        console.log(notifications);
        if (notifications.length > 0) {
            const employeeNotifications = notifications
                .map((notification) => notification.employees.map((employee) => employee.employeeNotificationId).flat())
                .flat();
            console.log(employeeNotifications);
            const updatedEmployeeNotifications = await Promise.all(employeeNotifications.map((employeeNotificationId) => this.employeeNotificationService.update(employeeNotificationId, {
                isRead: true,
            })));
            console.log(updatedEmployeeNotifications);
        }
        return reservationResponseDto;
    }
};
exports.FindReservationDetailUsecase = FindReservationDetailUsecase;
exports.FindReservationDetailUsecase = FindReservationDetailUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof reservation_service_1.DomainReservationService !== "undefined" && reservation_service_1.DomainReservationService) === "function" ? _a : Object, typeof (_b = typeof notification_service_1.DomainNotificationService !== "undefined" && notification_service_1.DomainNotificationService) === "function" ? _b : Object, typeof (_c = typeof employee_notification_service_1.DomainEmployeeNotificationService !== "undefined" && employee_notification_service_1.DomainEmployeeNotificationService) === "function" ? _c : Object])
], FindReservationDetailUsecase);
//# sourceMappingURL=find-reservation-detail.usecase.js.map