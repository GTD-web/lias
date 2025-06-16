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
exports.FindReservationListUsecase = void 0;
const common_1 = require("@nestjs/common");
const reservation_service_1 = require("@src/domain/reservation/reservation.service");
const reservation_response_dto_1 = require("../dtos/reservation-response.dto");
const typeorm_1 = require("typeorm");
const date_util_1 = require("@libs/utils/date.util");
const error_message_1 = require("@libs/constants/error-message");
const reservation_type_enum_1 = require("@libs/enums/reservation-type.enum");
let FindReservationListUsecase = class FindReservationListUsecase {
    constructor(reservationService) {
        this.reservationService = reservationService;
    }
    async execute(startDate, endDate, resourceType, resourceId, status) {
        if (startDate && endDate && startDate > endDate) {
            throw new common_1.BadRequestException(error_message_1.ERROR_MESSAGE.BUSINESS.RESERVATION.INVALID_DATE_RANGE);
        }
        if (status && status.filter((s) => reservation_type_enum_1.ReservationStatus[s]).length === 0) {
            throw new common_1.BadRequestException(error_message_1.ERROR_MESSAGE.BUSINESS.RESOURCE.INVALID_STATUS);
        }
        const regex = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
        let where = {};
        if (status && status.length > 0) {
            where.status = (0, typeorm_1.In)(status);
        }
        if (resourceType) {
            where.resource = {
                type: resourceType,
            };
        }
        if (resourceId) {
            where.resource = {
                resourceId,
            };
        }
        if (startDate && endDate) {
            where = {
                ...where,
                startDate: (0, typeorm_1.LessThan)(date_util_1.DateUtil.date(regex.test(endDate) ? endDate : endDate + ' 23:59:59').toDate()),
                endDate: (0, typeorm_1.MoreThan)(date_util_1.DateUtil.date(regex.test(startDate) ? startDate : startDate + ' 00:00:00').toDate()),
            };
        }
        const reservations = await this.reservationService.findAll({
            where,
            relations: ['resource', 'participants', 'participants.employee'],
            withDeleted: true,
        });
        const reservationResponseDtos = reservations.map((reservation) => new reservation_response_dto_1.ReservationWithRelationsResponseDto(reservation));
        return reservationResponseDtos;
    }
};
exports.FindReservationListUsecase = FindReservationListUsecase;
exports.FindReservationListUsecase = FindReservationListUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof reservation_service_1.DomainReservationService !== "undefined" && reservation_service_1.DomainReservationService) === "function" ? _a : Object])
], FindReservationListUsecase);
//# sourceMappingURL=find-reservation-list.usecase.js.map