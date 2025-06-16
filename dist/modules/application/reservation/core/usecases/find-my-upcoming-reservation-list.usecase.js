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
exports.FindMyUpcomingReservationListUsecase = void 0;
const common_1 = require("@nestjs/common");
const reservation_service_1 = require("@src/domain/reservation/reservation.service");
const reservation_response_dto_1 = require("../dtos/reservation-response.dto");
const reservation_type_enum_1 = require("@libs/enums/reservation-type.enum");
const typeorm_1 = require("typeorm");
const date_util_1 = require("@libs/utils/date.util");
let FindMyUpcomingReservationListUsecase = class FindMyUpcomingReservationListUsecase {
    constructor(reservationService) {
        this.reservationService = reservationService;
    }
    async execute(employeeId, query, resourceType) {
        const { page, limit } = query;
        const today = date_util_1.DateUtil.date(date_util_1.DateUtil.now().format('YYYY-MM-DD 00:00:00')).toDate();
        const where = {
            participants: { employeeId, type: reservation_type_enum_1.ParticipantsType.RESERVER },
            endDate: (0, typeorm_1.MoreThanOrEqual)(today),
        };
        if (resourceType) {
            where.resource = {
                type: resourceType,
            };
        }
        const options = {
            where,
            relations: ['resource', 'participants', 'participants.employee'],
        };
        const reservations = await this.reservationService.findAll(options);
        const count = reservations.length;
        const reservationWithParticipants = await this.reservationService.findAll({
            where: {
                reservationId: (0, typeorm_1.In)(reservations.map((r) => r.reservationId)),
            },
            relations: ['resource', 'participants', 'participants.employee'],
            order: {
                startDate: 'ASC',
            },
            skip: (page - 1) * limit,
            take: limit,
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
            items: groupedReservationsResponse,
            meta: {
                total: count,
                page,
                limit,
                hasNext: page * limit < count,
            },
        };
    }
};
exports.FindMyUpcomingReservationListUsecase = FindMyUpcomingReservationListUsecase;
exports.FindMyUpcomingReservationListUsecase = FindMyUpcomingReservationListUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof reservation_service_1.DomainReservationService !== "undefined" && reservation_service_1.DomainReservationService) === "function" ? _a : Object])
], FindMyUpcomingReservationListUsecase);
//# sourceMappingURL=find-my-upcoming-reservation-list.usecase.js.map