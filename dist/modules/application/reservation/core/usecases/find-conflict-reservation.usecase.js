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
exports.FindConflictReservationUsecase = void 0;
const common_1 = require("@nestjs/common");
const reservation_service_1 = require("@src/domain/reservation/reservation.service");
const typeorm_1 = require("typeorm");
const reservation_type_enum_1 = require("@libs/enums/reservation-type.enum");
let FindConflictReservationUsecase = class FindConflictReservationUsecase {
    constructor(reservationService) {
        this.reservationService = reservationService;
    }
    async execute(resourceId, startDate, endDate, reservationId) {
        return await this.reservationService.findAll({
            where: {
                resourceId,
                ...(reservationId && { reservationId: (0, typeorm_1.Not)(reservationId) }),
                startDate: (0, typeorm_1.LessThan)(endDate),
                endDate: (0, typeorm_1.MoreThan)(startDate),
                status: (0, typeorm_1.In)([reservation_type_enum_1.ReservationStatus.PENDING, reservation_type_enum_1.ReservationStatus.CONFIRMED, reservation_type_enum_1.ReservationStatus.CLOSED]),
            },
        });
    }
};
exports.FindConflictReservationUsecase = FindConflictReservationUsecase;
exports.FindConflictReservationUsecase = FindConflictReservationUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof reservation_service_1.DomainReservationService !== "undefined" && reservation_service_1.DomainReservationService) === "function" ? _a : Object])
], FindConflictReservationUsecase);
//# sourceMappingURL=find-conflict-reservation.usecase.js.map