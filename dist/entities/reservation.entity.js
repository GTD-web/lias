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
exports.Reservation = void 0;
const typeorm_1 = require("typeorm");
const resource_entity_1 = require("./resource.entity");
const reservation_participant_entity_1 = require("./reservation-participant.entity");
const reservation_type_enum_1 = require("@libs/enums/reservation-type.enum");
const reservation_vehicle_entity_1 = require("./reservation-vehicle.entity");
let Reservation = class Reservation {
};
exports.Reservation = Reservation;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        generated: 'uuid',
    }),
    __metadata("design:type", String)
], Reservation.prototype, "reservationId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Reservation.prototype, "resourceId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Reservation.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Reservation.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], Reservation.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], Reservation.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: reservation_type_enum_1.ReservationStatus,
    }),
    __metadata("design:type", typeof (_a = typeof reservation_type_enum_1.ReservationStatus !== "undefined" && reservation_type_enum_1.ReservationStatus) === "function" ? _a : Object)
], Reservation.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Reservation.prototype, "rejectReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Reservation.prototype, "isAllDay", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Reservation.prototype, "notifyBeforeStart", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Array)
], Reservation.prototype, "notifyMinutesBeforeStart", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => resource_entity_1.Resource),
    (0, typeorm_1.JoinColumn)({ name: 'resourceId' }),
    __metadata("design:type", resource_entity_1.Resource)
], Reservation.prototype, "resource", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reservation_participant_entity_1.ReservationParticipant, (participant) => participant.reservation),
    __metadata("design:type", Array)
], Reservation.prototype, "participants", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reservation_vehicle_entity_1.ReservationVehicle, (reservationVehicle) => reservationVehicle.reservation),
    __metadata("design:type", Array)
], Reservation.prototype, "reservationVehicles", void 0);
exports.Reservation = Reservation = __decorate([
    (0, typeorm_1.Entity)('reservations')
], Reservation);
//# sourceMappingURL=reservation.entity.js.map