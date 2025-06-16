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
exports.UpdateReservationUsecase = void 0;
const common_1 = require("@nestjs/common");
const reservation_service_1 = require("@src/domain/reservation/reservation.service");
const reservation_response_dto_1 = require("../dtos/reservation-response.dto");
const reservation_type_enum_1 = require("@libs/enums/reservation-type.enum");
const error_message_1 = require("@libs/constants/error-message");
const typeorm_1 = require("typeorm");
const date_util_1 = require("@libs/utils/date.util");
const notification_service_1 = require("@src/application/notification/services/notification.service");
const reservation_participant_service_1 = require("@src/domain/reservation-participant/reservation-participant.service");
const find_conflict_reservation_usecase_1 = require("./find-conflict-reservation.usecase");
const resource_type_enum_1 = require("@libs/enums/resource-type.enum");
const notification_type_enum_1 = require("@libs/enums/notification-type.enum");
const create_reservation_closing_job_usecase_1 = require("./create-reservation-closing-job.usecase");
const delete_reservation_closing_job_usecase_1 = require("./delete-reservation-closing-job.usecase");
let UpdateReservationUsecase = class UpdateReservationUsecase {
    constructor(reservationService, participantService, notificationService, findConflictReservationUsecase, createReservationClosingJob, deleteReservationClosingJob) {
        this.reservationService = reservationService;
        this.participantService = participantService;
        this.notificationService = notificationService;
        this.findConflictReservationUsecase = findConflictReservationUsecase;
        this.createReservationClosingJob = createReservationClosingJob;
        this.deleteReservationClosingJob = deleteReservationClosingJob;
    }
    async execute(reservationId, updateDto) {
        const reservation = await this.reservationService.findOne({
            where: { reservationId, status: (0, typeorm_1.In)([reservation_type_enum_1.ReservationStatus.PENDING, reservation_type_enum_1.ReservationStatus.CONFIRMED]) },
            relations: ['resource', 'participants'],
            withDeleted: true,
        });
        if (!reservation) {
            throw new common_1.NotFoundException(error_message_1.ERROR_MESSAGE.BUSINESS.RESERVATION.NOT_FOUND);
        }
        if (reservation.status === reservation_type_enum_1.ReservationStatus.CLOSED) {
            throw new common_1.BadRequestException(error_message_1.ERROR_MESSAGE.BUSINESS.RESERVATION.CANNOT_UPDATE_STATUS(reservation.status));
        }
        let hasUpdateTime = false;
        let hasUpdateParticipants = false;
        if (updateDto.participantIds) {
            hasUpdateParticipants =
                updateDto.participantIds.length !==
                    reservation.participants.filter((p) => p.type === reservation_type_enum_1.ParticipantsType.PARTICIPANT).length ||
                    updateDto.participantIds.some((id) => !reservation.participants.some((p) => p.employeeId === id));
        }
        if (updateDto.resourceId && updateDto.startDate && updateDto.endDate) {
            hasUpdateTime = true;
            const conflicts = await this.findConflictReservationUsecase.execute(updateDto.resourceId, date_util_1.DateUtil.date(updateDto.startDate).toDate(), date_util_1.DateUtil.date(updateDto.endDate).toDate(), reservationId);
            if (conflicts.length > 0) {
                throw new common_1.BadRequestException(error_message_1.ERROR_MESSAGE.BUSINESS.RESERVATION.TIME_CONFLICT);
            }
            if (reservation.status === reservation_type_enum_1.ReservationStatus.CONFIRMED &&
                reservation.resource.type === resource_type_enum_1.ResourceType.ACCOMMODATION) {
                throw new common_1.BadRequestException(error_message_1.ERROR_MESSAGE.BUSINESS.RESERVATION.CANNOT_UPDATE_ACCOMMODATION_TIME);
            }
        }
        const participantIds = updateDto.participantIds;
        delete updateDto.participantIds;
        let updatedReservation = await this.reservationService.findOne({
            where: { reservationId },
            relations: ['participants', 'resource'],
            withDeleted: true,
        });
        const hasUpdateTings = updateDto.title || updateDto.isAllDay || updateDto.notifyBeforeStart || updateDto.notifyMinutesBeforeStart;
        if (hasUpdateTings) {
            updatedReservation = await this.reservationService.update(reservationId, {
                title: updateDto?.title || undefined,
                isAllDay: updateDto?.isAllDay || undefined,
                notifyBeforeStart: updateDto?.notifyBeforeStart || undefined,
                notifyMinutesBeforeStart: updateDto?.notifyMinutesBeforeStart || undefined,
            }, {
                where: { reservationId },
                relations: ['participants', 'resource'],
                withDeleted: true,
            });
        }
        if (hasUpdateParticipants) {
            const participants = reservation.participants.filter((p) => p.type === reservation_type_enum_1.ParticipantsType.PARTICIPANT);
            const newParticipants = participantIds.filter((id) => !participants.some((p) => p.employeeId === id));
            const deletedParticipants = participants.filter((p) => !participantIds.includes(p.employeeId));
            await Promise.all(deletedParticipants.map((participant) => this.participantService.delete(participant.participantId)));
            await Promise.all(newParticipants.map((employeeId) => this.participantService.save({
                reservationId,
                employeeId,
                type: reservation_type_enum_1.ParticipantsType.PARTICIPANT,
            })));
            if (updatedReservation.resource.notifyParticipantChange) {
                try {
                    const notiTarget = [...newParticipants, ...participants.map((p) => p.employeeId)];
                    await this.notificationService.createNotification(notification_type_enum_1.NotificationType.RESERVATION_PARTICIPANT_CHANGED, {
                        reservationId: updatedReservation.reservationId,
                        reservationTitle: updatedReservation.title,
                        reservationDate: date_util_1.DateUtil.toAlarmRangeString(date_util_1.DateUtil.format(updatedReservation.startDate), date_util_1.DateUtil.format(updatedReservation.endDate)),
                        resourceId: updatedReservation.resource.resourceId,
                        resourceName: updatedReservation.resource.name,
                        resourceType: updatedReservation.resource.type,
                    }, notiTarget);
                }
                catch (error) {
                    console.log(error);
                    console.log('Notification creation failed in updateParticipants');
                }
            }
        }
        if (hasUpdateTime) {
            if (reservation.status === reservation_type_enum_1.ReservationStatus.CONFIRMED &&
                reservation.resource.type !== resource_type_enum_1.ResourceType.VEHICLE) {
                this.deleteReservationClosingJob.execute(reservationId);
                this.createReservationClosingJob.execute(reservation);
            }
            updatedReservation = await this.reservationService.update(reservationId, {
                startDate: updateDto.startDate ? date_util_1.DateUtil.date(updateDto.startDate).toDate() : undefined,
                endDate: updateDto.endDate ? date_util_1.DateUtil.date(updateDto.endDate).toDate() : undefined,
            }, {
                where: { reservationId },
                relations: ['participants', 'resource'],
                withDeleted: true,
            });
            if (updatedReservation.resource.notifyReservationChange) {
                try {
                    const notiTarget = updatedReservation.participants.map((participant) => participant.employeeId);
                    await this.notificationService.createNotification(notification_type_enum_1.NotificationType.RESERVATION_TIME_CHANGED, {
                        reservationId: updatedReservation.reservationId,
                        reservationTitle: updatedReservation.title,
                        reservationDate: date_util_1.DateUtil.toAlarmRangeString(date_util_1.DateUtil.format(updatedReservation.startDate), date_util_1.DateUtil.format(updatedReservation.endDate)),
                        resourceId: updatedReservation.resource.resourceId,
                        resourceName: updatedReservation.resource.name,
                        resourceType: updatedReservation.resource.type,
                    }, notiTarget);
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
                catch (error) {
                    console.log(error);
                    console.log('Notification creation failed in updateTime');
                }
            }
        }
        return new reservation_response_dto_1.ReservationResponseDto(updatedReservation);
    }
};
exports.UpdateReservationUsecase = UpdateReservationUsecase;
exports.UpdateReservationUsecase = UpdateReservationUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof reservation_service_1.DomainReservationService !== "undefined" && reservation_service_1.DomainReservationService) === "function" ? _a : Object, typeof (_b = typeof reservation_participant_service_1.DomainReservationParticipantService !== "undefined" && reservation_participant_service_1.DomainReservationParticipantService) === "function" ? _b : Object, typeof (_c = typeof notification_service_1.NotificationService !== "undefined" && notification_service_1.NotificationService) === "function" ? _c : Object, find_conflict_reservation_usecase_1.FindConflictReservationUsecase,
        create_reservation_closing_job_usecase_1.CreateReservationClosingJobUsecase,
        delete_reservation_closing_job_usecase_1.DeleteReservationClosingJobUsecase])
], UpdateReservationUsecase);
//# sourceMappingURL=update-reservation.usecase.js.map