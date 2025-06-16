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
exports.CreateReservationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const resource_type_enum_1 = require("@libs/enums/resource-type.enum");
const error_message_1 = require("@libs/constants/error-message");
const reservation_type_enum_1 = require("@libs/enums/reservation-type.enum");
class CreateReservationDto {
}
exports.CreateReservationDto = CreateReservationDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_STRING('자원 ID') }),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: resource_type_enum_1.ResourceType }),
    (0, class_validator_1.IsEnum)(resource_type_enum_1.ResourceType, { message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_ENUM('자원 타입', Object.values(resource_type_enum_1.ResourceType)) }),
    __metadata("design:type", typeof (_a = typeof resource_type_enum_1.ResourceType !== "undefined" && resource_type_enum_1.ResourceType) === "function" ? _a : Object)
], CreateReservationDto.prototype, "resourceType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_STRING('제목') }),
    (0, class_validator_1.Length)(0, 100, { message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_LENGTH('제목', 0, 100) }),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_STRING('설명') }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 100, { message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_LENGTH('설명', 0, 100) }),
    __metadata("design:type", String)
], CreateReservationDto.prototype, "description", void 0);
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
], CreateReservationDto.prototype, "startDate", void 0);
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
], CreateReservationDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsBoolean)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_BOOLEAN('종일 여부') }),
    __metadata("design:type", Boolean)
], CreateReservationDto.prototype, "isAllDay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsBoolean)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_BOOLEAN('시작 전 알림 여부') }),
    __metadata("design:type", Boolean)
], CreateReservationDto.prototype, "notifyBeforeStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, enum: reservation_type_enum_1.ReservationStatus }),
    __metadata("design:type", typeof (_b = typeof reservation_type_enum_1.ReservationStatus !== "undefined" && reservation_type_enum_1.ReservationStatus) === "function" ? _b : Object)
], CreateReservationDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [Number], example: [10, 20] }),
    (0, class_validator_1.IsArray)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_ARRAY('알림 시간') }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateReservationDto.prototype, "notifyMinutesBeforeStart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    (0, class_validator_1.IsArray)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_ARRAY('참가자 ID') }),
    (0, class_validator_1.IsString)({ each: true, message: error_message_1.ERROR_MESSAGE.VALIDATION.INVALID_ARRAY_ITEM_TYPE('참가자 ID', '문자열') }),
    __metadata("design:type", Array)
], CreateReservationDto.prototype, "participantIds", void 0);
//# sourceMappingURL=create-reservation.dto.js.map