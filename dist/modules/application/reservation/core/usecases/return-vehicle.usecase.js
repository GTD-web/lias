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
exports.ReturnVehicleUsecase = void 0;
const common_1 = require("@nestjs/common");
const reservation_service_1 = require("@src/domain/reservation/reservation.service");
const reservation_vehicle_service_1 = require("@src/domain/reservation-vehicle/reservation-vehicle.service");
const reservation_type_enum_1 = require("@libs/enums/reservation-type.enum");
const error_message_1 = require("@libs/constants/error-message");
const resource_type_enum_1 = require("@libs/enums/resource-type.enum");
const typeorm_1 = require("typeorm");
const notification_type_enum_1 = require("@libs/enums/notification-type.enum");
const date_util_1 = require("@libs/utils/date.util");
const notification_service_1 = require("@src/application/notification/services/notification.service");
const resource_service_1 = require("@src/domain/resource/resource.service");
const vehicle_info_service_1 = require("@src/domain/vehicle-info/vehicle-info.service");
const file_service_1 = require("@src/domain/file/file.service");
let ReturnVehicleUsecase = class ReturnVehicleUsecase {
    constructor(reservationService, reservationVehicleService, resourceService, vehicleInfoService, notificationService, fileService, dataSource) {
        this.reservationService = reservationService;
        this.reservationVehicleService = reservationVehicleService;
        this.resourceService = resourceService;
        this.vehicleInfoService = vehicleInfoService;
        this.notificationService = notificationService;
        this.fileService = fileService;
        this.dataSource = dataSource;
    }
    async execute(user, reservationId, returnDto) {
        const reservation = await this.reservationService.findOne({
            where: { reservationId },
            relations: ['resource', 'resource.vehicleInfo', 'resource.resourceManagers'],
            withDeleted: true,
        });
        if (!reservation) {
            throw new common_1.NotFoundException(error_message_1.ERROR_MESSAGE.BUSINESS.RESERVATION.NOT_FOUND);
        }
        if (reservation.resource.type !== resource_type_enum_1.ResourceType.VEHICLE) {
            throw new common_1.BadRequestException(error_message_1.ERROR_MESSAGE.BUSINESS.RESERVATION.INVALID_RESOURCE_TYPE);
        }
        if (reservation.status !== reservation_type_enum_1.ReservationStatus.CONFIRMED) {
            throw new common_1.BadRequestException(error_message_1.ERROR_MESSAGE.BUSINESS.RESERVATION.CANNOT_RETURN_STATUS(reservation.status));
        }
        if (reservation.resource.vehicleInfo.totalMileage > returnDto.totalMileage) {
            throw new common_1.BadRequestException(error_message_1.ERROR_MESSAGE.BUSINESS.RESERVATION.INVALID_MILEAGE);
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const reservationVehicles = await this.reservationVehicleService.findAll({
                where: { reservationId },
                relations: ['reservation', 'vehicleInfo'],
            });
            if (!reservationVehicles || reservationVehicles.length === 0) {
                throw new common_1.NotFoundException(error_message_1.ERROR_MESSAGE.BUSINESS.RESERVATION.VEHICLE_NOT_FOUND);
            }
            const reservationVehicle = reservationVehicles[0];
            if (reservationVehicle.isReturned) {
                throw new common_1.BadRequestException(error_message_1.ERROR_MESSAGE.BUSINESS.RESERVATION.VEHICLE_ALREADY_RETURNED);
            }
            await this.reservationService.update(reservationId, {
                status: reservation_type_enum_1.ReservationStatus.CLOSED,
            }, { queryRunner });
            await this.reservationVehicleService.update(reservationVehicle.reservationVehicleId, {
                endOdometer: returnDto.totalMileage,
                isReturned: true,
                returnedAt: date_util_1.DateUtil.now().toDate(),
            }, { queryRunner });
            const vehicleInfoId = reservation.resource.vehicleInfo.vehicleInfoId;
            await this.resourceService.update(reservation.resource.resourceId, { location: returnDto.location }, { queryRunner });
            if (!returnDto.parkingLocationImages)
                returnDto.parkingLocationImages = [];
            if (!returnDto.odometerImages)
                returnDto.odometerImages = [];
            if (!returnDto.indoorImages)
                returnDto.indoorImages = [];
            returnDto.parkingLocationImages = returnDto.parkingLocationImages.map((image) => this.fileService.getFileUrl(image));
            returnDto.odometerImages = returnDto.odometerImages.map((image) => this.fileService.getFileUrl(image));
            returnDto.indoorImages = returnDto.indoorImages.map((image) => this.fileService.getFileUrl(image));
            console.log(returnDto.parkingLocationImages);
            console.log(returnDto.odometerImages);
            console.log(returnDto.indoorImages);
            const images = [...returnDto.parkingLocationImages, ...returnDto.odometerImages, ...returnDto.indoorImages];
            if (images.length > 0) {
                await this.fileService.updateTemporaryFiles(images, false, {
                    queryRunner,
                });
            }
            await this.vehicleInfoService.update(vehicleInfoId, {
                totalMileage: returnDto.totalMileage,
                leftMileage: returnDto.leftMileage,
                parkingLocationImages: returnDto.parkingLocationImages,
                odometerImages: returnDto.odometerImages,
                indoorImages: returnDto.indoorImages,
            }, { queryRunner });
            const notiTarget = [user.employeeId];
            await this.notificationService.createNotification(notification_type_enum_1.NotificationType.RESOURCE_VEHICLE_RETURNED, {
                resourceId: reservation.resource.resourceId,
                resourceName: reservation.resource.name,
                resourceType: reservation.resource.type,
            }, notiTarget);
            await queryRunner.commitTransaction();
            return true;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            console.error('Error in returnVehicle:', error);
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.ReturnVehicleUsecase = ReturnVehicleUsecase;
exports.ReturnVehicleUsecase = ReturnVehicleUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof reservation_service_1.DomainReservationService !== "undefined" && reservation_service_1.DomainReservationService) === "function" ? _a : Object, typeof (_b = typeof reservation_vehicle_service_1.DomainReservationVehicleService !== "undefined" && reservation_vehicle_service_1.DomainReservationVehicleService) === "function" ? _b : Object, typeof (_c = typeof resource_service_1.DomainResourceService !== "undefined" && resource_service_1.DomainResourceService) === "function" ? _c : Object, typeof (_d = typeof vehicle_info_service_1.DomainVehicleInfoService !== "undefined" && vehicle_info_service_1.DomainVehicleInfoService) === "function" ? _d : Object, typeof (_e = typeof notification_service_1.NotificationService !== "undefined" && notification_service_1.NotificationService) === "function" ? _e : Object, typeof (_f = typeof file_service_1.DomainFileService !== "undefined" && file_service_1.DomainFileService) === "function" ? _f : Object, typeorm_1.DataSource])
], ReturnVehicleUsecase);
//# sourceMappingURL=return-vehicle.usecase.js.map