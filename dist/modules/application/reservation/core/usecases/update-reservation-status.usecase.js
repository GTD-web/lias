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
exports.UpdateReservationStatusUsecase = void 0;
const common_1 = require("@nestjs/common");
const reservation_service_1 = require("@src/domain/reservation/reservation.service");
const reservation_type_enum_1 = require("@libs/enums/reservation-type.enum");
const error_message_1 = require("@libs/constants/error-message");
const date_util_1 = require("@libs/utils/date.util");
const notification_service_1 = require("@src/application/notification/services/notification.service");
const reservation_participant_service_1 = require("@src/domain/reservation-participant/reservation-participant.service");
const notification_type_enum_1 = require("@libs/enums/notification-type.enum");
const reservation_response_dto_1 = require("../dtos/reservation-response.dto");
const create_reservation_closing_job_usecase_1 = require("./create-reservation-closing-job.usecase");
const delete_reservation_closing_job_usecase_1 = require("./delete-reservation-closing-job.usecase");
let UpdateReservationStatusUsecase = class UpdateReservationStatusUsecase {
    constructor(reservationService, participantService, notificationService, createReservationClosingJob, deleteReservationClosingJob) {
        this.reservationService = reservationService;
        this.participantService = participantService;
        this.notificationService = notificationService;
        this.createReservationClosingJob = createReservationClosingJob;
        this.deleteReservationClosingJob = deleteReservationClosingJob;
    }
    async execute(reservationId, updateDto) {
        const reservation = await this.reservationService.findOne({
            where: { reservationId },
            withDeleted: true,
        });
        if (!reservation) {
            throw new common_1.NotFoundException(error_message_1.ERROR_MESSAGE.BUSINESS.RESERVATION.NOT_FOUND);
        }
        if (reservation.status === reservation_type_enum_1.ReservationStatus.CLOSED) {
            throw new common_1.BadRequestException(error_message_1.ERROR_MESSAGE.BUSINESS.RESERVATION.CANNOT_UPDATE_STATUS(reservation.status));
        }
        const updatedReservation = await this.reservationService.update(reservationId, updateDto, {
            relations: ['resource', 'resource.resourceManagers', 'participants', 'participants.employee'],
            withDeleted: true,
        });
        if (updateDto.status === reservation_type_enum_1.ReservationStatus.CANCELLED || updateDto.status === reservation_type_enum_1.ReservationStatus.REJECTED) {
            this.deleteReservationClosingJob.execute(reservationId);
        }
        if (updateDto.status === reservation_type_enum_1.ReservationStatus.CONFIRMED) {
            this.createReservationClosingJob.execute(updatedReservation);
        }
        const notiTarget = [
            ...updatedReservation.resource.resourceManagers.map((manager) => manager.employeeId),
            ...updatedReservation.participants.map((reserver) => reserver.employeeId),
        ];
        if (updatedReservation.resource.notifyReservationChange && updateDto.status !== reservation_type_enum_1.ReservationStatus.CLOSED) {
            try {
                let notificationType;
                switch (updateDto.status) {
                    case reservation_type_enum_1.ReservationStatus.CONFIRMED:
                        notificationType = notification_type_enum_1.NotificationType.RESERVATION_STATUS_CONFIRMED;
                        break;
                    case reservation_type_enum_1.ReservationStatus.CANCELLED:
                        notificationType = notification_type_enum_1.NotificationType.RESERVATION_STATUS_CANCELLED;
                        break;
                    case reservation_type_enum_1.ReservationStatus.REJECTED:
                        notificationType = notification_type_enum_1.NotificationType.RESERVATION_STATUS_REJECTED;
                        break;
                }
                await this.notificationService.createNotification(notificationType, {
                    reservationId: updatedReservation.reservationId,
                    reservationTitle: updatedReservation.title,
                    reservationDate: date_util_1.DateUtil.toAlarmRangeString(date_util_1.DateUtil.format(updatedReservation.startDate), date_util_1.DateUtil.format(updatedReservation.endDate)),
                    resourceId: updatedReservation.resource.resourceId,
                    resourceName: updatedReservation.resource.name,
                    resourceType: updatedReservation.resource.type,
                }, notiTarget);
                if (updateDto.status === reservation_type_enum_1.ReservationStatus.CONFIRMED) {
                    for (const beforeMinutes of updatedReservation.notifyMinutesBeforeStart) {
                        await this.notificationService.createNotification(notification_type_enum_1.NotificationType.RESERVATION_DATE_UPCOMING, {
                            reservationId: updatedReservation.reservationId,
                            reservationTitle: updatedReservation.title,
                            resourceId: updatedReservation.resource.resourceId,
                            resourceName: updatedReservation.resource.name,
                            resourceType: updatedReservation.resource.type,
                            reservationDate: date_util_1.DateUtil.format(updatedReservation.startDate),
                            beforeMinutes: beforeMinutes,
                        }, notiTarget);
                    }
                }
            }
            catch (error) {
                console.log(error);
                console.log('Notification creation failed in updateStatus');
            }
        }
        return new reservation_response_dto_1.ReservationResponseDto(updatedReservation);
    }
};
exports.UpdateReservationStatusUsecase = UpdateReservationStatusUsecase;
exports.UpdateReservationStatusUsecase = UpdateReservationStatusUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof reservation_service_1.DomainReservationService !== "undefined" && reservation_service_1.DomainReservationService) === "function" ? _a : Object, typeof (_b = typeof reservation_participant_service_1.DomainReservationParticipantService !== "undefined" && reservation_participant_service_1.DomainReservationParticipantService) === "function" ? _b : Object, typeof (_c = typeof notification_service_1.NotificationService !== "undefined" && notification_service_1.NotificationService) === "function" ? _c : Object, create_reservation_closing_job_usecase_1.CreateReservationClosingJobUsecase,
        delete_reservation_closing_job_usecase_1.DeleteReservationClosingJobUsecase])
], UpdateReservationStatusUsecase);
//# sourceMappingURL=update-reservation-status.usecase.js.map