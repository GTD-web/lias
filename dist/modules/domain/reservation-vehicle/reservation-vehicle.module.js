"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainReservationVehicleModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const reservation_vehicle_service_1 = require("./reservation-vehicle.service");
const reservation_vehicle_repository_1 = require("./reservation-vehicle.repository");
const reservation_vehicle_entity_1 = require("@libs/entities/reservation-vehicle.entity");
let DomainReservationVehicleModule = class DomainReservationVehicleModule {
};
exports.DomainReservationVehicleModule = DomainReservationVehicleModule;
exports.DomainReservationVehicleModule = DomainReservationVehicleModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([reservation_vehicle_entity_1.ReservationVehicle])],
        providers: [reservation_vehicle_service_1.DomainReservationVehicleService, reservation_vehicle_repository_1.DomainReservationVehicleRepository],
        exports: [reservation_vehicle_service_1.DomainReservationVehicleService],
    })
], DomainReservationVehicleModule);
//# sourceMappingURL=reservation-vehicle.module.js.map