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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarResponseDto = exports.GroupedReservationWithResourceResponseDto = exports.GroupedReservationResponseDto = exports.CreateReservationResponseDto = exports.ReservationWithRelationsResponseDto = exports.ReservationWithResourceResponseDto = exports.ReservationVehicleResponseDto = exports.ReservationParticipantResponseDto = exports.ReservationResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const reservation_type_enum_1 = require("@libs/enums/reservation-type.enum");
const reservation_type_enum_2 = require("@libs/enums/reservation-type.enum");
const dtos_index_1 = require("@resource/dtos.index");
const date_util_1 = require("@libs/utils/date.util");
class ReservationResponseDto {
    constructor(reservation) {
        this.reservationId = reservation?.reservationId;
        this.resourceId = reservation?.resourceId;
        this.title = reservation?.title;
        this.description = reservation?.description;
        this.rejectReason = reservation?.rejectReason;
        this.startDate = date_util_1.DateUtil.format(reservation?.startDate);
        this.endDate = date_util_1.DateUtil.format(reservation?.endDate);
        this.status = reservation?.status;
        this.isAllDay = reservation?.isAllDay;
        this.notifyBeforeStart = reservation?.notifyBeforeStart;
        this.notifyMinutesBeforeStart = reservation?.notifyMinutesBeforeStart;
    }
}
exports.ReservationResponseDto = ReservationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReservationResponseDto.prototype, "reservationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ReservationResponseDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ReservationResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ReservationResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ReservationResponseDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ReservationResponseDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ReservationResponseDto.prototype, "rejectReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: reservation_type_enum_1.ReservationStatus, required: false }),
    __metadata("design:type", typeof (_a = typeof reservation_type_enum_1.ReservationStatus !== "undefined" && reservation_type_enum_1.ReservationStatus) === "function" ? _a : Object)
], ReservationResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Boolean)
], ReservationResponseDto.prototype, "isAllDay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Boolean)
], ReservationResponseDto.prototype, "notifyBeforeStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [Number] }),
    __metadata("design:type", Array)
], ReservationResponseDto.prototype, "notifyMinutesBeforeStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Boolean)
], ReservationResponseDto.prototype, "isMine", void 0);
class ReservationParticipantResponseDto {
}
exports.ReservationParticipantResponseDto = ReservationParticipantResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReservationParticipantResponseDto.prototype, "participantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReservationParticipantResponseDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReservationParticipantResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => dtos_index_1.EmployeeResponseDto, required: false }),
    __metadata("design:type", typeof (_b = typeof dtos_index_1.EmployeeResponseDto !== "undefined" && dtos_index_1.EmployeeResponseDto) === "function" ? _b : Object)
], ReservationParticipantResponseDto.prototype, "employee", void 0);
class ReservationVehicleResponseDto {
}
exports.ReservationVehicleResponseDto = ReservationVehicleResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReservationVehicleResponseDto.prototype, "reservationVehicleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ReservationVehicleResponseDto.prototype, "vehicleInfoId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ReservationVehicleResponseDto.prototype, "startOdometer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ReservationVehicleResponseDto.prototype, "endOdometer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ReservationVehicleResponseDto.prototype, "startFuelLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ReservationVehicleResponseDto.prototype, "endFuelLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ReservationVehicleResponseDto.prototype, "isReturned", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], ReservationVehicleResponseDto.prototype, "returnedAt", void 0);
class ReservationWithResourceResponseDto extends ReservationResponseDto {
    constructor(reservation) {
        super(reservation);
        this.resource = reservation?.resource;
    }
}
exports.ReservationWithResourceResponseDto = ReservationWithResourceResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => dtos_index_1.ResourceResponseDto, required: false }),
    __metadata("design:type", typeof (_c = typeof dtos_index_1.ResourceResponseDto !== "undefined" && dtos_index_1.ResourceResponseDto) === "function" ? _c : Object)
], ReservationWithResourceResponseDto.prototype, "resource", void 0);
class ReservationWithRelationsResponseDto extends ReservationResponseDto {
    constructor(reservation) {
        super(reservation);
        this.resource = reservation?.resource;
        this.reservers = reservation?.participants?.filter((participant) => participant.type === reservation_type_enum_2.ParticipantsType.RESERVER);
        this.participants = reservation?.participants?.filter((participant) => participant.type === reservation_type_enum_2.ParticipantsType.PARTICIPANT);
        this.reservationVehicles = reservation?.reservationVehicles;
    }
}
exports.ReservationWithRelationsResponseDto = ReservationWithRelationsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => dtos_index_1.ResourceResponseDto, required: false }),
    __metadata("design:type", typeof (_d = typeof dtos_index_1.ResourceResponseDto !== "undefined" && dtos_index_1.ResourceResponseDto) === "function" ? _d : Object)
], ReservationWithRelationsResponseDto.prototype, "resource", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ReservationParticipantResponseDto], required: false }),
    __metadata("design:type", Array)
], ReservationWithRelationsResponseDto.prototype, "reservers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ReservationParticipantResponseDto], required: false }),
    __metadata("design:type", Array)
], ReservationWithRelationsResponseDto.prototype, "participants", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ReservationVehicleResponseDto], required: false }),
    __metadata("design:type", Array)
], ReservationWithRelationsResponseDto.prototype, "reservationVehicles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Boolean)
], ReservationWithRelationsResponseDto.prototype, "isMine", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Boolean)
], ReservationWithRelationsResponseDto.prototype, "returnable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Boolean)
], ReservationWithRelationsResponseDto.prototype, "modifiable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Boolean)
], ReservationWithRelationsResponseDto.prototype, "hasUnreadNotification", void 0);
class CreateReservationResponseDto {
}
exports.CreateReservationResponseDto = CreateReservationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123e4567-e89b-12d3-a456-426614174000' }),
    __metadata("design:type", String)
], CreateReservationResponseDto.prototype, "reservationId", void 0);
class GroupedReservationResponseDto {
}
exports.GroupedReservationResponseDto = GroupedReservationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '날짜 (YYYY-MM-DD 형식)' }),
    __metadata("design:type", String)
], GroupedReservationResponseDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '해당 날짜의 예약 목록',
        type: [ReservationWithRelationsResponseDto],
    }),
    __metadata("design:type", Array)
], GroupedReservationResponseDto.prototype, "reservations", void 0);
class GroupedReservationWithResourceResponseDto {
}
exports.GroupedReservationWithResourceResponseDto = GroupedReservationWithResourceResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '자원 정보',
        type: () => dtos_index_1.ResourceResponseDto,
    }),
    __metadata("design:type", typeof (_e = typeof dtos_index_1.ResourceResponseDto !== "undefined" && dtos_index_1.ResourceResponseDto) === "function" ? _e : Object)
], GroupedReservationWithResourceResponseDto.prototype, "resource", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '예약 목록',
        required: false,
        type: [GroupedReservationResponseDto],
    }),
    __metadata("design:type", Array)
], GroupedReservationWithResourceResponseDto.prototype, "groupedReservations", void 0);
class CalendarResponseDto {
}
exports.CalendarResponseDto = CalendarResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '예약 캘린더',
        type: [ReservationWithRelationsResponseDto],
    }),
    __metadata("design:type", Array)
], CalendarResponseDto.prototype, "reservations", void 0);
//# sourceMappingURL=reservation-response.dto.js.map