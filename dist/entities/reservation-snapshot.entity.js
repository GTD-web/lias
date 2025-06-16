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
exports.ReservationSnapshot = void 0;
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("./employee.entity");
let ReservationSnapshot = class ReservationSnapshot {
};
exports.ReservationSnapshot = ReservationSnapshot;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        generated: 'uuid',
    }),
    __metadata("design:type", String)
], ReservationSnapshot.prototype, "snapshotId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReservationSnapshot.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationSnapshot.prototype, "step", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationSnapshot.prototype, "resourceType", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], ReservationSnapshot.prototype, "droppableGroupData", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], ReservationSnapshot.prototype, "dateRange", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], ReservationSnapshot.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], ReservationSnapshot.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], ReservationSnapshot.prototype, "timeRange", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ReservationSnapshot.prototype, "timeUnit", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], ReservationSnapshot.prototype, "selectedResource", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ReservationSnapshot.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Array)
], ReservationSnapshot.prototype, "reminderTimes", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ReservationSnapshot.prototype, "isAllDay", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ReservationSnapshot.prototype, "notifyBeforeStart", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Array)
], ReservationSnapshot.prototype, "notifyMinutesBeforeStart", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Array)
], ReservationSnapshot.prototype, "attendees", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], ReservationSnapshot.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], ReservationSnapshot.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employeeId' }),
    __metadata("design:type", typeof (_a = typeof employee_entity_1.Employee !== "undefined" && employee_entity_1.Employee) === "function" ? _a : Object)
], ReservationSnapshot.prototype, "employee", void 0);
exports.ReservationSnapshot = ReservationSnapshot = __decorate([
    (0, typeorm_1.Entity)('reservation_snapshots')
], ReservationSnapshot);
//# sourceMappingURL=reservation-snapshot.entity.js.map