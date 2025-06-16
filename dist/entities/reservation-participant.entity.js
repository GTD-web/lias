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
exports.ReservationParticipant = void 0;
const typeorm_1 = require("typeorm");
const reservation_entity_1 = require("./reservation.entity");
const employee_entity_1 = require("./employee.entity");
const reservation_type_enum_1 = require("@libs/enums/reservation-type.enum");
let ReservationParticipant = class ReservationParticipant {
};
exports.ReservationParticipant = ReservationParticipant;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        generated: 'uuid',
    }),
    __metadata("design:type", String)
], ReservationParticipant.prototype, "participantId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReservationParticipant.prototype, "reservationId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReservationParticipant.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: reservation_type_enum_1.ParticipantsType,
    }),
    __metadata("design:type", typeof (_a = typeof reservation_type_enum_1.ParticipantsType !== "undefined" && reservation_type_enum_1.ParticipantsType) === "function" ? _a : Object)
], ReservationParticipant.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => reservation_entity_1.Reservation),
    (0, typeorm_1.JoinColumn)({ name: 'reservationId' }),
    __metadata("design:type", reservation_entity_1.Reservation)
], ReservationParticipant.prototype, "reservation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employeeId' }),
    __metadata("design:type", typeof (_b = typeof employee_entity_1.Employee !== "undefined" && employee_entity_1.Employee) === "function" ? _b : Object)
], ReservationParticipant.prototype, "employee", void 0);
exports.ReservationParticipant = ReservationParticipant = __decorate([
    (0, typeorm_1.Entity)('reservation_participants')
], ReservationParticipant);
//# sourceMappingURL=reservation-participant.entity.js.map