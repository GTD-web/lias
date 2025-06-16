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
exports.EmployeeReservationStatsResponseDto = exports.EmployeeReservationStatsFilterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const base_dto_1 = require("./base.dto");
class EmployeeReservationStatsFilterDto extends base_dto_1.YearMonthFilterDto {
}
exports.EmployeeReservationStatsFilterDto = EmployeeReservationStatsFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '직원 ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmployeeReservationStatsFilterDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '직원 이름' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EmployeeReservationStatsFilterDto.prototype, "employeeName", void 0);
class EmployeeReservationStatsResponseDto {
}
exports.EmployeeReservationStatsResponseDto = EmployeeReservationStatsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '연도' }),
    __metadata("design:type", Number)
], EmployeeReservationStatsResponseDto.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '월' }),
    __metadata("design:type", Number)
], EmployeeReservationStatsResponseDto.prototype, "month", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '연월 (YYYY-MM)' }),
    __metadata("design:type", String)
], EmployeeReservationStatsResponseDto.prototype, "yearMonth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 ID' }),
    __metadata("design:type", String)
], EmployeeReservationStatsResponseDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 이름' }),
    __metadata("design:type", String)
], EmployeeReservationStatsResponseDto.prototype, "employeeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '총 예약 횟수' }),
    __metadata("design:type", Number)
], EmployeeReservationStatsResponseDto.prototype, "reservationCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '총 이용 시간 (시간)' }),
    __metadata("design:type", Number)
], EmployeeReservationStatsResponseDto.prototype, "totalHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '예약당 평균 이용 시간 (시간)' }),
    __metadata("design:type", Number)
], EmployeeReservationStatsResponseDto.prototype, "avgHoursPerReservation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '차량 예약 횟수' }),
    __metadata("design:type", Number)
], EmployeeReservationStatsResponseDto.prototype, "vehicleCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '회의실 예약 횟수' }),
    __metadata("design:type", Number)
], EmployeeReservationStatsResponseDto.prototype, "meetingRoomCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '숙소 예약 횟수' }),
    __metadata("design:type", Number)
], EmployeeReservationStatsResponseDto.prototype, "accommodationCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '취소 횟수' }),
    __metadata("design:type", Number)
], EmployeeReservationStatsResponseDto.prototype, "cancellationCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '통계 계산 시점' }),
    __metadata("design:type", Date)
], EmployeeReservationStatsResponseDto.prototype, "computedAt", void 0);
//# sourceMappingURL=employee-reservation-stats.dto.js.map