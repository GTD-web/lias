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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationVehicle = void 0;
const typeorm_1 = require("typeorm");
const reservation_entity_1 = require("./reservation.entity");
const vehicle_info_entity_1 = require("./vehicle-info.entity");
let ReservationVehicle = class ReservationVehicle {
};
exports.ReservationVehicle = ReservationVehicle;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        generated: 'uuid',
    }),
    __metadata("design:type", String)
], ReservationVehicle.prototype, "reservationVehicleId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReservationVehicle.prototype, "reservationId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReservationVehicle.prototype, "vehicleInfoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ReservationVehicle.prototype, "startOdometer", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ReservationVehicle.prototype, "endOdometer", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ReservationVehicle.prototype, "startFuelLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ReservationVehicle.prototype, "endFuelLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ReservationVehicle.prototype, "isReturned", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp with time zone', nullable: true }),
    __metadata("design:type", Date)
], ReservationVehicle.prototype, "returnedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => reservation_entity_1.Reservation),
    (0, typeorm_1.JoinColumn)({ name: 'reservationId' }),
    __metadata("design:type", reservation_entity_1.Reservation)
], ReservationVehicle.prototype, "reservation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vehicle_info_entity_1.VehicleInfo),
    (0, typeorm_1.JoinColumn)({ name: 'vehicleInfoId' }),
    __metadata("design:type", vehicle_info_entity_1.VehicleInfo)
], ReservationVehicle.prototype, "vehicleInfo", void 0);
exports.ReservationVehicle = ReservationVehicle = __decorate([
    (0, typeorm_1.Entity)('reservation_vehicles')
], ReservationVehicle);
//# sourceMappingURL=reservation-vehicle.entity.js.map