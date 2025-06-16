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
exports.FindAvailableTimeUsecase = void 0;
const common_1 = require("@nestjs/common");
const resource_service_1 = require("@src/domain/resource/resource.service");
const date_util_1 = require("@libs/utils/date.util");
const resource_type_enum_1 = require("@libs/enums/resource-type.enum");
const reservation_type_enum_1 = require("@libs/enums/reservation-type.enum");
const available_time_response_dto_1 = require("@src/application/resource/core/dtos/available-time-response.dto");
const error_message_1 = require("@libs/constants/error-message");
const typeorm_1 = require("typeorm");
const reservation_service_1 = require("@src/domain/reservation/reservation.service");
let FindAvailableTimeUsecase = class FindAvailableTimeUsecase {
    constructor(resourceService, reservationService) {
        this.resourceService = resourceService;
        this.reservationService = reservationService;
    }
    async execute(query) {
        const { resourceType, resourceGroupId, startDate, endDate, startTime, endTime, am, pm, timeUnit, reservationId, } = query;
        if (!startDate && !endDate) {
            throw new common_1.BadRequestException(error_message_1.ERROR_MESSAGE.BUSINESS.RESOURCE.DATE_REQUIRED);
        }
        if (startDate && endDate && startDate > endDate) {
            throw new common_1.BadRequestException(error_message_1.ERROR_MESSAGE.BUSINESS.RESOURCE.INVALID_DATE_RANGE);
        }
        const isTimeRange = startTime && endTime;
        const isTimeSelected = (am !== undefined || pm !== undefined) && timeUnit;
        if (isTimeRange && isTimeSelected) {
            throw new common_1.BadRequestException(error_message_1.ERROR_MESSAGE.BUSINESS.RESOURCE.TIME_RANGE_CONFLICT);
        }
        const resources = await this.resourceService.findAll({
            where: {
                isAvailable: true,
                resourceGroupId: resourceGroupId,
                type: resourceType,
            },
            relations: ['resourceGroup'],
        });
        const startDateObj = (0, typeorm_1.LessThan)(endTime ? date_util_1.DateUtil.date(endDate + ' ' + endTime).toDate() : date_util_1.DateUtil.date(endDate + ' 23:59:59').toDate());
        const endDateObj = (0, typeorm_1.MoreThanOrEqual)(startTime
            ? date_util_1.DateUtil.date(startDate + ' ' + startTime).toDate()
            : date_util_1.DateUtil.date(startDate + ' 00:00:00').toDate());
        for (const resource of resources) {
            const reservations = await this.reservationService.findAll({
                where: {
                    resourceId: resource.resourceId,
                    reservationId: reservationId ? (0, typeorm_1.Not)(reservationId) : undefined,
                    status: (0, typeorm_1.In)([reservation_type_enum_1.ReservationStatus.PENDING, reservation_type_enum_1.ReservationStatus.CONFIRMED, reservation_type_enum_1.ReservationStatus.CLOSED]),
                    startDate: startDateObj,
                    endDate: endDateObj,
                },
            });
            resource.reservations = reservations;
        }
        const result = [];
        if (!resources || (resources && resources.length === 0)) {
            return result;
        }
        const isSameDay = startDate === endDate;
        const isAccommodation = resourceType === resource_type_enum_1.ResourceType.ACCOMMODATION;
        if (!isAccommodation && isSameDay && timeUnit) {
            for (const resource of resources) {
                const availabilityDto = new available_time_response_dto_1.ResourceAvailabilityDto();
                availabilityDto.resourceId = resource.resourceId;
                availabilityDto.resourceName = resource.name;
                availabilityDto.availableTimeSlots = this.calculateAvailableTimeSlots(resource, startDate, endDate, am, pm, timeUnit, isSameDay);
                result.push(availabilityDto);
            }
        }
        else if (isAccommodation || !isSameDay) {
            const combinedStartDateTime = startTime ? `${startDate} ${startTime}` : `${startDate} 00:00:00`;
            const combinedEndDateTime = endTime ? `${endDate} ${endTime}` : `${endDate} 24:00:00`;
            const startDateObj = date_util_1.DateUtil.date(combinedStartDateTime);
            const endDateObj = date_util_1.DateUtil.date(combinedEndDateTime);
            for (const resource of resources) {
                const confirmedReservations = resource.reservations.filter((reservation) => reservation.status === reservation_type_enum_1.ReservationStatus.CONFIRMED ||
                    reservation.status === reservation_type_enum_1.ReservationStatus.PENDING);
                const hasConflict = confirmedReservations.some((reservation) => {
                    const reserveStart = date_util_1.DateUtil.date(reservation.startDate);
                    const reserveEnd = date_util_1.DateUtil.date(reservation.endDate);
                    return ((this.isSameOrAfter(startDateObj, reserveStart) && this.isBefore(startDateObj, reserveEnd)) ||
                        (this.isAfter(endDateObj, reserveStart) && this.isSameOrBefore(endDateObj, reserveEnd)) ||
                        (this.isBefore(startDateObj, reserveStart) && this.isAfter(endDateObj, reserveEnd)));
                });
                if (!hasConflict) {
                    const availabilityDto = new available_time_response_dto_1.ResourceAvailabilityDto();
                    availabilityDto.resourceId = resource.resourceId;
                    availabilityDto.resourceName = resource.name;
                    if (resource.location) {
                        const location = resource.location;
                        availabilityDto.resourceLocation =
                            location.address + (location.detailAddress ? ` ${location.detailAddress}` : '');
                    }
                    result.push(availabilityDto);
                }
            }
        }
        else {
            throw new common_1.BadRequestException('시간 조회 조건이 올바르지 않습니다.');
        }
        return result;
    }
    calculateAvailableTimeSlots(resource, startDate, endDate, am, pm, timeUnit, isSameDay) {
        const availableSlots = [];
        const existingReservations = resource.reservations || [];
        const confirmedReservations = existingReservations;
        if (isSameDay) {
            const now = date_util_1.DateUtil.now();
            const dateStr = startDate;
            const currentMinute = now.toDate().getMinutes();
            const roundedHour = now.format(`${now.format('HH') < '09' ? '09' : now.format('HH')}:${now.format('HH') < '09' || currentMinute < 30 ? '00' : '30'}:00`);
            const isToday = startDate === now.format('YYYY-MM-DD');
            const isAllDay = (am && pm) || (!am && !pm);
            const isVehicle = resource.type === resource_type_enum_1.ResourceType.VEHICLE;
            let startTime;
            let endTime;
            if (isVehicle) {
                if (isToday) {
                    startTime = roundedHour;
                    endTime = '24:00:00';
                }
                else {
                    if (isAllDay) {
                        startTime = '00:00:00';
                        endTime = '24:00:00';
                    }
                    else {
                        startTime = am ? '00:00:00' : '12:00:00';
                        endTime = am ? '12:00:00' : '24:00:00';
                    }
                }
            }
            else {
                if (isToday) {
                    startTime = roundedHour;
                    endTime = '18:00:00';
                }
                else {
                    if (isAllDay) {
                        startTime = '09:00:00';
                        endTime = '18:00:00';
                    }
                    else {
                        startTime = am ? '09:00:00' : '12:00:00';
                        endTime = am ? '12:00:00' : '18:00:00';
                    }
                }
            }
            this.processTimeRange(dateStr, startTime, endTime, timeUnit, confirmedReservations, availableSlots);
        }
        else {
            let currentDate = date_util_1.DateUtil.date(startDate);
            const endDateObj = date_util_1.DateUtil.date(endDate);
            while (this.isSameOrBefore(currentDate, endDateObj)) {
                const dateStr = currentDate.format('YYYY-MM-DD');
                this.processTimeRange(dateStr, '00:00:00', '23:59:59', timeUnit, confirmedReservations, availableSlots);
                currentDate = currentDate.addDays(1);
            }
        }
        return availableSlots;
    }
    processTimeRange(dateStr, startTime, endTime, timeUnit, confirmedReservations, availableSlots) {
        const startTime_obj = date_util_1.DateUtil.date(`${dateStr} ${startTime}`);
        const endTime_obj = date_util_1.DateUtil.date(`${dateStr} ${endTime}`);
        const slotIntervalMinutes = 30;
        let slotStart = startTime_obj;
        while (this.isBefore(slotStart, endTime_obj)) {
            const slotEnd = slotStart.addMinutes(timeUnit);
            if (this.isAfter(slotEnd, endTime_obj)) {
                slotStart = slotStart.addMinutes(slotIntervalMinutes);
                continue;
            }
            const isAvailable = !confirmedReservations.some((reservation) => {
                const reservationStart = date_util_1.DateUtil.date(reservation.startDate);
                const reservationEnd = date_util_1.DateUtil.date(reservation.endDate);
                return ((this.isSameOrAfter(slotStart, reservationStart) && this.isBefore(slotStart, reservationEnd)) ||
                    (this.isAfter(slotEnd, reservationStart) && this.isSameOrBefore(slotEnd, reservationEnd)) ||
                    (this.isBefore(slotStart, reservationStart) && this.isAfter(slotEnd, reservationEnd)));
            });
            if (isAvailable) {
                availableSlots.push({
                    startTime: slotStart.format(),
                    endTime: slotEnd.format(),
                });
            }
            slotStart = slotStart.addMinutes(slotIntervalMinutes);
        }
    }
    isSameOrBefore(d1, d2) {
        return d1.toDate().getTime() <= d2.toDate().getTime();
    }
    isBefore(d1, d2) {
        return d1.toDate().getTime() < d2.toDate().getTime();
    }
    isAfter(d1, d2) {
        return d1.toDate().getTime() > d2.toDate().getTime();
    }
    isSameOrAfter(d1, d2) {
        return d1.toDate().getTime() >= d2.toDate().getTime();
    }
};
exports.FindAvailableTimeUsecase = FindAvailableTimeUsecase;
exports.FindAvailableTimeUsecase = FindAvailableTimeUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof resource_service_1.DomainResourceService !== "undefined" && resource_service_1.DomainResourceService) === "function" ? _a : Object, typeof (_b = typeof reservation_service_1.DomainReservationService !== "undefined" && reservation_service_1.DomainReservationService) === "function" ? _b : Object])
], FindAvailableTimeUsecase);
//# sourceMappingURL=findAvailableTime.usecase.js.map