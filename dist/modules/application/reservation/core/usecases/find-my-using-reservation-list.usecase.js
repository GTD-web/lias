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
exports.FindMyUsingReservationListUsecase = void 0;
const common_1 = require("@nestjs/common");
const reservation_service_1 = require("@src/domain/reservation/reservation.service");
const reservation_response_dto_1 = require("../dtos/reservation-response.dto");
const reservation_type_enum_1 = require("@libs/enums/reservation-type.enum");
const resource_type_enum_1 = require("@libs/enums/resource-type.enum");
const typeorm_1 = require("typeorm");
const date_util_1 = require("@libs/utils/date.util");
let FindMyUsingReservationListUsecase = class FindMyUsingReservationListUsecase {
    constructor(reservationService) {
        this.reservationService = reservationService;
    }
    async execute(employeeId) {
        const where = [
            {
                participants: { employeeId, type: reservation_type_enum_1.ParticipantsType.RESERVER },
                resource: { type: resource_type_enum_1.ResourceType.VEHICLE },
                status: reservation_type_enum_1.ReservationStatus.CONFIRMED,
                startDate: (0, typeorm_1.LessThanOrEqual)(date_util_1.DateUtil.date(date_util_1.DateUtil.now().format()).toDate()),
                endDate: (0, typeorm_1.MoreThanOrEqual)(date_util_1.DateUtil.date(date_util_1.DateUtil.now().format()).toDate()),
            },
            {
                participants: { employeeId, type: reservation_type_enum_1.ParticipantsType.RESERVER },
                status: reservation_type_enum_1.ReservationStatus.CLOSED,
                reservationVehicles: {
                    isReturned: false,
                },
            },
        ];
        const reservations = await this.reservationService.findAll({
            where,
            relations: ['resource', 'reservationVehicles', 'participants'],
            order: {
                startDate: 'ASC',
            },
            withDeleted: true,
        });
        reservations.sort((a, b) => {
            if (a.status === reservation_type_enum_1.ReservationStatus.CONFIRMED) {
                return -1;
            }
            return 1;
        });
        return {
            items: reservations.map((reservation) => new reservation_response_dto_1.ReservationWithRelationsResponseDto(reservation)),
            meta: {
                total: reservations.length,
                page: 1,
                limit: reservations.length,
                hasNext: false,
            },
        };
    }
};
exports.FindMyUsingReservationListUsecase = FindMyUsingReservationListUsecase;
exports.FindMyUsingReservationListUsecase = FindMyUsingReservationListUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof reservation_service_1.DomainReservationService !== "undefined" && reservation_service_1.DomainReservationService) === "function" ? _a : Object])
], FindMyUsingReservationListUsecase);
//# sourceMappingURL=find-my-using-reservation-list.usecase.js.map