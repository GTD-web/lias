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
exports.UpdateVehicleInfoDto = exports.UpdateConsumableDto = exports.UpdateMaintenanceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const error_message_1 = require("@libs/constants/error-message");
class UpdateMaintenanceDto {
}
exports.UpdateMaintenanceDto = UpdateMaintenanceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.Matches)(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, {
        message: error_message_1.ERROR_MESSAGE.VALIDATION.INVALID_DATE_FORMAT('날짜', 'YYYY-MM-DD'),
    }),
    __metadata("design:type", String)
], UpdateMaintenanceDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsInt)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_INT('주행거리') }),
    (0, class_validator_1.Min)(0, { message: error_message_1.ERROR_MESSAGE.VALIDATION.INVALID_MILEAGE('주행거리') }),
    (0, class_validator_1.Max)(999999999, { message: error_message_1.ERROR_MESSAGE.VALIDATION.INVALID_MILEAGE('주행거리') }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateMaintenanceDto.prototype, "mileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_INT('비용') }),
    (0, class_validator_1.Min)(0, { message: error_message_1.ERROR_MESSAGE.VALIDATION.INVALID_MILEAGE('비용') }),
    (0, class_validator_1.Max)(999999999, { message: error_message_1.ERROR_MESSAGE.VALIDATION.INVALID_MILEAGE('비용') }),
    __metadata("design:type", Number)
], UpdateMaintenanceDto.prototype, "cost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_ARRAY('이미지') }),
    __metadata("design:type", Array)
], UpdateMaintenanceDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '소모품 ID',
        example: 'consumable-123',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMaintenanceDto.prototype, "consumableId", void 0);
class UpdateConsumableDto {
}
exports.UpdateConsumableDto = UpdateConsumableDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '소모품 이름' }),
    (0, class_validator_1.IsString)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_STRING('소모품 이름') }),
    (0, class_validator_1.Length)(0, 100, { message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_LENGTH('소모품 이름', 0, 100) }),
    __metadata("design:type", String)
], UpdateConsumableDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '소모품 교체 주기' }),
    (0, class_validator_1.IsInt)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_INT('소모품 교체 주기') }),
    (0, class_validator_1.Min)(0, { message: error_message_1.ERROR_MESSAGE.VALIDATION.INVALID_MILEAGE('소모품 교체 주기') }),
    (0, class_validator_1.Max)(999999999, { message: error_message_1.ERROR_MESSAGE.VALIDATION.INVALID_MILEAGE('소모품 교체 주기') }),
    __metadata("design:type", Number)
], UpdateConsumableDto.prototype, "replaceCycle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: true, description: '소모품 교체 알림 주기' }),
    (0, class_validator_1.IsBoolean)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_BOOLEAN('소모품 교체 알림 주기') }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateConsumableDto.prototype, "notifyReplacementCycle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '차량 ID',
        example: 'vehicle-123',
    }),
    __metadata("design:type", String)
], UpdateConsumableDto.prototype, "vehicleInfoId", void 0);
class UpdateVehicleInfoDto {
}
exports.UpdateVehicleInfoDto = UpdateVehicleInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_STRING('차량 번호') }),
    (0, class_validator_1.Length)(0, 100, { message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_LENGTH('차량 번호', 0, 100) }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVehicleInfoDto.prototype, "vehicleNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_STRING('보험 이름') }),
    (0, class_validator_1.Length)(0, 100, { message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_LENGTH('보험 이름', 0, 100) }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVehicleInfoDto.prototype, "insuranceName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_STRING('보험 번호') }),
    (0, class_validator_1.Length)(0, 100, { message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_LENGTH('보험 번호', 0, 100) }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVehicleInfoDto.prototype, "insuranceNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsInt)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_INT('총 주행거리') }),
    (0, class_validator_1.Min)(0, { message: error_message_1.ERROR_MESSAGE.VALIDATION.INVALID_MILEAGE('총 주행거리') }),
    (0, class_validator_1.Max)(999999999, { message: error_message_1.ERROR_MESSAGE.VALIDATION.INVALID_MILEAGE('총 주행거리') }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateVehicleInfoDto.prototype, "totalMileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsInt)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_INT('남은 주행거리') }),
    (0, class_validator_1.Min)(0, { message: error_message_1.ERROR_MESSAGE.VALIDATION.INVALID_MILEAGE('남은 주행거리') }),
    (0, class_validator_1.Max)(999999999, { message: error_message_1.ERROR_MESSAGE.VALIDATION.INVALID_MILEAGE('남은 주행거리') }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateVehicleInfoDto.prototype, "leftMileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsArray)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_ARRAY('주차 위치 이미지') }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateVehicleInfoDto.prototype, "parkingLocationImages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsArray)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_ARRAY('주행거리계 이미지') }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateVehicleInfoDto.prototype, "odometerImages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsArray)({ message: error_message_1.ERROR_MESSAGE.VALIDATION.IS_ARRAY('실내 이미지') }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateVehicleInfoDto.prototype, "indoorImages", void 0);
//# sourceMappingURL=update-vehicle-info.dto.js.map