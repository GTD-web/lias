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
exports.FindResourceReservationListUsecase = void 0;
const common_1 = require("@nestjs/common");
const reservation_service_1 = require("@src/domain/reservation/reservation.service");
const resource_service_1 = require("@src/domain/resource/resource.service");
const reservation_response_dto_1 = require("../dtos/reservation-response.dto");
const reservation_type_enum_1 = require("@libs/enums/reservation-type.enum");
const typeorm_1 = require("typeorm");
const date_util_1 = require("@libs/utils/date.util");
const dtos_index_1 = require("@resource/dtos.index");
const error_message_1 = require("@libs/constants/error-message");
let FindResourceReservationListUsecase = class FindResourceReservationListUsecase {
    constructor(reservationService, resourceService) {
        this.reservationService = reservationService;
        this.resourceService = resourceService;
    }
    async execute(employeeId, resourceId, page, limit, month, isMine) {
        const monthStart = `${month}-01 00:00:00`;
        const lastDay = date_util_1.DateUtil.date(month).getLastDayOfMonth().getDate();
        const monthEnd = `${month}-${lastDay} 23:59:59`;
        const monthStartDate = date_util_1.DateUtil.date(monthStart).toDate();
        const monthEndDate = date_util_1.DateUtil.date(monthEnd).toDate();
        const dateCondition = (0, typeorm_1.Raw)((alias) => `(${alias} BETWEEN :monthStartDate AND :monthEndDate OR
              "Reservation"."endDate" BETWEEN :monthStartDate AND :monthEndDate OR
              (${alias} <= :monthStartDate AND "Reservation"."endDate" >= :monthEndDate))`, { monthStartDate, monthEndDate });
        const where = {
            startDate: dateCondition,
            resourceId: resourceId,
        };
        const resource = await this.resourceService.findOne({
            where: { resourceId: resourceId },
        });
        if (!resource) {
            throw new common_1.NotFoundException(error_message_1.ERROR_MESSAGE.BUSINESS.RESOURCE.NOT_FOUND);
        }
        if (isMine) {
            where.participants = { employeeId, type: reservation_type_enum_1.ParticipantsType.RESERVER };
        }
        const options = {
            where,
        };
        if (page && limit) {
            options.skip = (page - 1) * limit;
            options.take = limit;
        }
        const reservations = await this.reservationService.findAll(options);
        const count = await this.reservationService.count({ where });
        const reservationWithParticipants = await this.reservationService.findAll({
            where: {
                reservationId: (0, typeorm_1.In)(reservations.map((r) => r.reservationId)),
            },
            relations: ['participants', 'participants.employee'],
            withDeleted: true,
        });
        const groupedReservations = reservationWithParticipants.reduce((acc, reservation) => {
            const date = date_util_1.DateUtil.format(reservation.startDate, 'YYYY-MM-DD');
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(reservation);
            return acc;
        }, {});
        const groupedReservationsResponse = Object.entries(groupedReservations).map(([date, reservations]) => ({
            date,
            reservations: reservations.map((reservation) => new reservation_response_dto_1.ReservationWithRelationsResponseDto(reservation)),
        }));
        return {
            resource: new dtos_index_1.ResourceResponseDto(resource),
            groupedReservations: groupedReservationsResponse,
        };
    }
};
exports.FindResourceReservationListUsecase = FindResourceReservationListUsecase;
exports.FindResourceReservationListUsecase = FindResourceReservationListUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof reservation_service_1.DomainReservationService !== "undefined" && reservation_service_1.DomainReservationService) === "function" ? _a : Object, typeof (_b = typeof resource_service_1.DomainResourceService !== "undefined" && resource_service_1.DomainResourceService) === "function" ? _b : Object])
], FindResourceReservationListUsecase);
//# sourceMappingURL=find-resource-reservation-list.usecase.js.map