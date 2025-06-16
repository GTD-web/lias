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
exports.ReturnVehicleDto = exports.UpdateReservationDto = exports.UpdateReservationCcReceipientDto = exports.UpdateReservationParticipantsDto = exports.UpdateReservationStatusDto = exports.UpdateReservationTimeDto = exports.UpdateReservationTitleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const reservation_type_enum_1 = require("@libs/enums/reservation-type.enum");
const date_util_1 = require("@libs/utils/date.util");
const error_message_1 = require("@libs/constants/error-message");
const resource_entity_1 = require("@libs/entities/resource.entity");
class UpdateReservationTitleDto {
}
exports.UpdateReservationTitleDto = UpdateReservationTitleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_STRING('제목') }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 100, { message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_LENGTH('제목', 0, 100) }),
    __metadata("design:type", String)
], UpdateReservationTitleDto.prototype, "title", void 0);
class UpdateReservationTimeDto {
    constructor(reservation) {
        this.startDate = date_util_1.DateUtil.format(reservation?.startDate);
        this.endDate = date_util_1.DateUtil.format(reservation?.endDate);
        this.isAllDay = reservation?.isAllDay;
    }
    getPropertiesAndTypes() {
        return Object.getOwnPropertyNames(this).map((property) => ({
            property,
            type: Reflect.getMetadata('design:type', this, property),
        }));
    }
}
exports.UpdateReservationTimeDto = UpdateReservationTimeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-01-01 00:00:00',
        description: '예약 시작 시간 (YYYY-MM-DD HH:mm:ss 형식)',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.Matches)(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: error_message_1.ERROR_MESSAGE.VALIDATION.INVALID_DATE_FORMAT('시작 시간', 'YYYY-MM-DD HH:mm:ss'),
    }),
    __metadata("design:type", String)
], UpdateReservationTimeDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-01-01 00:00:00',
        description: '예약 종료 시간 (YYYY-MM-DD HH:mm:ss 형식)',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.Matches)(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: error_message_1.ERROR_MESSAGE.VALIDATION.INVALID_DATE_FORMAT('종료 시간', 'YYYY-MM-DD HH:mm:ss'),
    }),
    __metadata("design:type", String)
], UpdateReservationTimeDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsBoolean)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_BOOLEAN('종일 여부') }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateReservationTimeDto.prototype, "isAllDay", void 0);
class UpdateReservationStatusDto {
}
exports.UpdateReservationStatusDto = UpdateReservationStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: reservation_type_enum_1.ReservationStatus }),
    (0, class_validator_1.IsEnum)(reservation_type_enum_1.ReservationStatus, {
        message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_ENUM('예약 상태', Object.values(reservation_type_enum_1.ReservationStatus)),
    }),
    __metadata("design:type", typeof (_a = typeof reservation_type_enum_1.ReservationStatus !== "undefined" && reservation_type_enum_1.ReservationStatus) === "function" ? _a : Object)
], UpdateReservationStatusDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_STRING('거절 사유') }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 100, { message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_LENGTH('거절 사유', 0, 100) }),
    __metadata("design:type", String)
], UpdateReservationStatusDto.prototype, "rejectReason", void 0);
class UpdateReservationParticipantsDto {
}
exports.UpdateReservationParticipantsDto = UpdateReservationParticipantsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    (0, class_validator_1.IsArray)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_ARRAY('참가자 ID') }),
    (0, class_validator_1.IsString)({ each: true, message: error_message_1.ERROR_MESSAGE.VALIDATION.INVALID_ARRAY_ITEM_TYPE('참가자 ID', '문자열') }),
    __metadata("design:type", Array)
], UpdateReservationParticipantsDto.prototype, "participantIds", void 0);
class UpdateReservationCcReceipientDto {
}
exports.UpdateReservationCcReceipientDto = UpdateReservationCcReceipientDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    (0, class_validator_1.IsArray)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_ARRAY('수신참조자 ID') }),
    (0, class_validator_1.IsString)({ each: true, message: error_message_1.ERROR_MESSAGE.VALIDATION.INVALID_ARRAY_ITEM_TYPE('수신참조자 ID', '문자열') }),
    __metadata("design:type", Array)
], UpdateReservationCcReceipientDto.prototype, "ccReceipientIds", void 0);
class UpdateReservationDto {
}
exports.UpdateReservationDto = UpdateReservationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_STRING('자원 ID') }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReservationDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_STRING('제목') }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 100, { message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_LENGTH('제목', 0, 100) }),
    __metadata("design:type", String)
], UpdateReservationDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-01-01 00:00:00',
        description: '예약 시작 시간 (YYYY-MM-DD HH:mm:ss 형식)',
        required: false,
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.Matches)(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: error_message_1.ERROR_MESSAGE.VALIDATION.INVALID_DATE_FORMAT('시작 시간', 'YYYY-MM-DD HH:mm:ss'),
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReservationDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-01-01 00:00:00',
        description: '예약 종료 시간 (YYYY-MM-DD HH:mm:ss 형식)',
        required: false,
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.Matches)(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
        message: error_message_1.ERROR_MESSAGE.VALIDATION.INVALID_DATE_FORMAT('종료 시간', 'YYYY-MM-DD HH:mm:ss'),
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReservationDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, required: false }),
    (0, class_validator_1.IsBoolean)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_BOOLEAN('종일 여부') }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateReservationDto.prototype, "isAllDay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, required: false }),
    (0, class_validator_1.IsBoolean)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_BOOLEAN('시작 전 알림 여부') }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateReservationDto.prototype, "notifyBeforeStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [Number], example: [10, 20] }),
    (0, class_validator_1.IsArray)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_ARRAY('알림 시간') }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateReservationDto.prototype, "notifyMinutesBeforeStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String], required: false }),
    (0, class_validator_1.IsArray)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_ARRAY('참가자 ID') }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true, message: error_message_1.ERROR_MESSAGE.VALIDATION.INVALID_ARRAY_ITEM_TYPE('참가자 ID', '문자열') }),
    __metadata("design:type", Array)
], UpdateReservationDto.prototype, "participantIds", void 0);
class ReturnVehicleDto {
}
exports.ReturnVehicleDto = ReturnVehicleDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", typeof (_b = typeof resource_entity_1.ResourceLocation !== "undefined" && resource_entity_1.ResourceLocation) === "function" ? _b : Object)
], ReturnVehicleDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ minimum: 0, maximum: 999999999 }),
    (0, class_validator_1.IsInt)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_INT('남은 주행거리') }),
    (0, class_validator_1.Min)(0, { message: error_message_1.ERROR_MESSAGE.VALIDATION.INVALID_MILEAGE('남은 주행거리') }),
    (0, class_validator_1.Max)(999999999, { message: error_message_1.ERROR_MESSAGE.VALIDATION.INVALID_MILEAGE('남은 주행거리') }),
    __metadata("design:type", Number)
], ReturnVehicleDto.prototype, "leftMileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ minimum: 0, maximum: 999999999 }),
    (0, class_validator_1.IsInt)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_INT('총 주행거리') }),
    (0, class_validator_1.Min)(0, { message: error_message_1.ERROR_MESSAGE.VALIDATION.INVALID_MILEAGE('총 주행거리') }),
    (0, class_validator_1.Max)(999999999, { message: error_message_1.ERROR_MESSAGE.VALIDATION.INVALID_MILEAGE('총 주행거리') }),
    __metadata("design:type", Number)
], ReturnVehicleDto.prototype, "totalMileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsArray)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_ARRAY('주차 위치 이미지') }),
    (0, class_validator_1.IsString)({ each: true, message: error_message_1.ERROR_MESSAGE.VALIDATION.INVALID_ARRAY_ITEM_TYPE('주차 위치 이미지', '문자열') }),
    __metadata("design:type", Array)
], ReturnVehicleDto.prototype, "parkingLocationImages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsArray)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_ARRAY('주행거리계 이미지') }),
    (0, class_validator_1.IsString)({ each: true, message: error_message_1.ERROR_MESSAGE.VALIDATION.INVALID_ARRAY_ITEM_TYPE('주행거리계 이미지', '문자열') }),
    __metadata("design:type", Array)
], ReturnVehicleDto.prototype, "odometerImages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsArray)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_ARRAY('차량 실내 이미지') }),
    (0, class_validator_1.IsString)({ each: true, message: error_message_1.ERROR_MESSAGE.VALIDATION.INVALID_ARRAY_ITEM_TYPE('차량 실내 이미지', '문자열') }),
    __metadata("design:type", Array)
], ReturnVehicleDto.prototype, "indoorImages", void 0);
//# sourceMappingURL=update-reservation.dto.js.map