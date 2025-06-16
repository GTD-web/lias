"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainReservationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const reservation_service_1 = require("./reservation.service");
const reservation_repository_1 = require("./reservation.repository");
const reservation_entity_1 = require("@libs/entities/reservation.entity");
let DomainReservationModule = class DomainReservationModule {
};
exports.DomainReservationModule = DomainReservationModule;
exports.DomainReservationModule = DomainReservationModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([reservation_entity_1.Reservation])],
        providers: [reservation_service_1.DomainReservationService, reservation_repository_1.DomainReservationRepository],
        exports: [reservation_service_1.DomainReservationService],
    })
], DomainReservationModule);
//# sourceMappingURL=reservation.module.js.map