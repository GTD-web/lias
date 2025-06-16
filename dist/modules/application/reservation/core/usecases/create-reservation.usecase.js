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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReservationUsecase = void 0;
const common_1 = require("@nestjs/common");
const reservation_type_enum_1 = require("@libs/enums/reservation-type.enum");
const typeorm_1 = require("typeorm");
const date_util_1 = require("@libs/utils/date.util");
const reservation_service_1 = require("@src/domain/reservation/reservation.service");
const reservation_participant_service_1 = require("@src/domain/reservation-participant/reservation-participant.service");
const entities_1 = require("@libs/entities");
const resource_type_enum_1 = require("@libs/enums/resource-type.enum");
const notification_type_enum_1 = require("@libs/enums/notification-type.enum");
const reservation_vehicle_service_1 = require("@src/domain/reservation-vehicle/reservation-vehicle.service");
const error_message_1 = require("@libs/constants/error-message");
const resource_service_1 = require("@src/domain/resource/resource.service");
const notification_service_1 = require("@src/application/notification/services/notification.service");
const role_type_enum_1 = require("@libs/enums/role-type.enum");
const employee_service_1 = require("@src/domain/employee/employee.service");
const find_conflict_reservation_usecase_1 = require("./find-conflict-reservation.usecase");
const create_reservation_closing_job_usecase_1 = require("./create-reservation-closing-job.usecase");
let CreateReservationUsecase = class CreateReservationUsecase {
    constructor(reservationService, participantService, reservationVehicleService, resourceService, employeeService, notificationService, dataSource, findConflictReservationUsecase, createReservationClosingJob) {
        this.reservationService = reservationService;
        this.participantService = participantService;
        this.reservationVehicleService = reservationVehicleService;
        this.resourceService = resourceService;
        this.employeeService = employeeService;
        this.notificationService = notificationService;
        this.dataSource = dataSource;
        this.findConflictReservationUsecase = findConflictReservationUsecase;
        this.createReservationClosingJob = createReservationClosingJob;
    }
    async execute(user, createDto) {
        const conflicts = await this.findConflictReservationUsecase.execute(createDto.resourceId, date_util_1.DateUtil.date(createDto.startDate).toDate(), date_util_1.DateUtil.date(createDto.endDate).toDate());
        if (conflicts.length > 0) {
            throw new common_1.BadRequestException(error_message_1.ERROR_MESSAGE.BUSINESS.RESERVATION.TIME_CONFLICT);
        }
        if (createDto.startDate > createDto.endDate) {
            throw new common_1.BadRequestException(error_message_1.ERROR_MESSAGE.BUSINESS.RESERVATION.INVALID_DATE_RANGE);
        }
        const resource = await this.resourceService.findOne({
            where: { resourceId: createDto.resourceId },
            relations: ['vehicleInfo'],
        });
        if (!resource.isAvailable) {
            throw new common_1.BadRequestException(error_message_1.ERROR_MESSAGE.BUSINESS.RESERVATION.RESOURCE_UNAVAILABLE);
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            createDto.status =
                createDto.resourceType === resource_type_enum_1.ResourceType.ACCOMMODATION
                    ? reservation_type_enum_1.ReservationStatus.PENDING
                    : reservation_type_enum_1.ReservationStatus.CONFIRMED;
            const reservation = await this.reservationService.create(createDto);
            reservation.startDate = date_util_1.DateUtil.date(createDto.startDate).toDate();
            reservation.endDate = date_util_1.DateUtil.date(createDto.endDate).toDate();
            const savedReservation = await this.reservationService.save(reservation, {
                queryRunner,
            });
            if (createDto.resourceType === resource_type_enum_1.ResourceType.VEHICLE) {
                const reservationVehicle = new entities_1.ReservationVehicle();
                reservationVehicle.reservationId = savedReservation.reservationId;
                reservationVehicle.vehicleInfoId = resource.vehicleInfo.vehicleInfoId;
                reservationVehicle.startOdometer = resource.vehicleInfo.totalMileage;
                reservationVehicle.isReturned = false;
                reservationVehicle.returnedAt = null;
                await this.reservationVehicleService.save(reservationVehicle, {
                    queryRunner,
                });
            }
            await Promise.all([
                this.participantService.save({
                    reservationId: savedReservation.reservationId,
                    employeeId: user.employeeId,
                    type: reservation_type_enum_1.ParticipantsType.RESERVER,
                }, { queryRunner }),
                ...createDto.participantIds.map((employeeId) => this.participantService.save({
                    reservationId: savedReservation.reservationId,
                    employeeId,
                    type: reservation_type_enum_1.ParticipantsType.PARTICIPANT,
                }, { queryRunner })),
            ]);
            await queryRunner.commitTransaction();
            if (resource.type !== resource_type_enum_1.ResourceType.VEHICLE) {
                await this.createReservationClosingJob.execute(savedReservation);
            }
            try {
                const reservationWithResource = await this.reservationService.findOne({
                    where: { reservationId: savedReservation.reservationId },
                    relations: ['resource'],
                    withDeleted: true,
                });
                if (reservationWithResource.status === reservation_type_enum_1.ReservationStatus.CONFIRMED) {
                    const notiTarget = [...createDto.participantIds, user.employeeId];
                    await this.notificationService.createNotification(notification_type_enum_1.NotificationType.RESERVATION_STATUS_CONFIRMED, {
                        reservationId: reservationWithResource.reservationId,
                        reservationTitle: reservationWithResource.title,
                        reservationDate: date_util_1.DateUtil.toAlarmRangeString(date_util_1.DateUtil.format(reservationWithResource.startDate), date_util_1.DateUtil.format(reservationWithResource.endDate)),
                        resourceId: reservationWithResource.resource.resourceId,
                        resourceName: reservationWithResource.resource.name,
                        resourceType: reservationWithResource.resource.type,
                    }, notiTarget);
                    for (const beforeMinutes of reservationWithResource.notifyMinutesBeforeStart) {
                        await this.notificationService.createNotification(notification_type_enum_1.NotificationType.RESERVATION_DATE_UPCOMING, {
                            reservationId: reservationWithResource.reservationId,
                            reservationTitle: reservationWithResource.title,
                            resourceId: reservationWithResource.resource.resourceId,
                            resourceName: reservationWithResource.resource.name,
                            resourceType: reservationWithResource.resource.type,
                            reservationDate: date_util_1.DateUtil.format(reservationWithResource.startDate),
                            beforeMinutes: beforeMinutes,
                        }, notiTarget);
                    }
                }
                else if (reservationWithResource.status === reservation_type_enum_1.ReservationStatus.PENDING &&
                    reservationWithResource.resource.type === resource_type_enum_1.ResourceType.ACCOMMODATION) {
                    const systemAdmins = await this.employeeService.findAll({
                        where: {
                            roles: (0, typeorm_1.Raw)(() => `'${role_type_enum_1.Role.SYSTEM_ADMIN}' = ANY("roles")`),
                        },
                    });
                    await this.notificationService.createNotification(notification_type_enum_1.NotificationType.RESERVATION_STATUS_PENDING, {
                        reservationId: reservationWithResource.reservationId,
                        reservationTitle: reservationWithResource.title,
                        reservationDate: date_util_1.DateUtil.toAlarmRangeString(date_util_1.DateUtil.format(reservationWithResource.startDate), date_util_1.DateUtil.format(reservationWithResource.endDate)),
                        resourceId: reservationWithResource.resource.resourceId,
                        resourceName: reservationWithResource.resource.name,
                        resourceType: reservationWithResource.resource.type,
                    }, systemAdmins.map((user) => user.employeeId));
                }
            }
            catch (error) {
                console.log(error);
                console.log('Notification creation failed');
            }
            return {
                reservationId: savedReservation.reservationId,
            };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.CreateReservationUsecase = CreateReservationUsecase;
exports.CreateReservationUsecase = CreateReservationUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof reservation_service_1.DomainReservationService !== "undefined" && reservation_service_1.DomainReservationService) === "function" ? _a : Object, typeof (_b = typeof reservation_participant_service_1.DomainReservationParticipantService !== "undefined" && reservation_participant_service_1.DomainReservationParticipantService) === "function" ? _b : Object, typeof (_c = typeof reservation_vehicle_service_1.DomainReservationVehicleService !== "undefined" && reservation_vehicle_service_1.DomainReservationVehicleService) === "function" ? _c : Object, typeof (_d = typeof resource_service_1.DomainResourceService !== "undefined" && resource_service_1.DomainResourceService) === "function" ? _d : Object, typeof (_e = typeof employee_service_1.DomainEmployeeService !== "undefined" && employee_service_1.DomainEmployeeService) === "function" ? _e : Object, typeof (_f = typeof notification_service_1.NotificationService !== "undefined" && notification_service_1.NotificationService) === "function" ? _f : Object, typeorm_1.DataSource,
        find_conflict_reservation_usecase_1.FindConflictReservationUsecase,
        create_reservation_closing_job_usecase_1.CreateReservationClosingJobUsecase])
], CreateReservationUsecase);
//# sourceMappingURL=create-reservation.usecase.js.map