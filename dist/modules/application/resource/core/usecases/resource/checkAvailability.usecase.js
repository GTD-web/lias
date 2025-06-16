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
exports.CheckAvailabilityUsecase = void 0;
const common_1 = require("@nestjs/common");
const resource_service_1 = require("@src/domain/resource/resource.service");
const date_util_1 = require("@libs/utils/date.util");
const reservation_type_enum_1 = require("@libs/enums/reservation-type.enum");
const typeorm_1 = require("typeorm");
let CheckAvailabilityUsecase = class CheckAvailabilityUsecase {
    constructor(resourceService) {
        this.resourceService = resourceService;
    }
    async execute(resourceId, startDate, endDate, reservationId) {
        const startDateObj = date_util_1.DateUtil.date(startDate).toDate();
        const endDateObj = date_util_1.DateUtil.date(endDate).toDate();
        const resource = await this.resourceService.findOne({
            where: {
                resourceId: resourceId,
                reservations: {
                    reservationId: reservationId ? (0, typeorm_1.Not)(reservationId) : undefined,
                    status: reservation_type_enum_1.ReservationStatus.CONFIRMED,
                    startDate: (0, typeorm_1.LessThan)(endDateObj),
                    endDate: (0, typeorm_1.MoreThan)(startDateObj),
                },
            },
            relations: ['reservations'],
        });
        console.log(resource);
        return !resource;
    }
};
exports.CheckAvailabilityUsecase = CheckAvailabilityUsecase;
exports.CheckAvailabilityUsecase = CheckAvailabilityUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof resource_service_1.DomainResourceService !== "undefined" && resource_service_1.DomainResourceService) === "function" ? _a : Object])
], CheckAvailabilityUsecase);
//# sourceMappingURL=checkAvailability.usecase.js.map