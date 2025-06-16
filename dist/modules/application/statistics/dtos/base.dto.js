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
exports.StatisticsResponseDto = exports.YearMonthFilterDto = exports.DateRangeFilterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class DateRangeFilterDto {
}
exports.DateRangeFilterDto = DateRangeFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '시작 날짜' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DateRangeFilterDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '종료 날짜' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DateRangeFilterDto.prototype, "endDate", void 0);
class YearMonthFilterDto {
}
exports.YearMonthFilterDto = YearMonthFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '연도' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], YearMonthFilterDto.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '월' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], YearMonthFilterDto.prototype, "month", void 0);
class StatisticsResponseDto {
}
exports.StatisticsResponseDto = StatisticsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 예약 통계', type: 'array' }),
    __metadata("design:type", Array)
], StatisticsResponseDto.prototype, "employeeReservationStats", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '자원 사용 통계', type: 'array' }),
    __metadata("design:type", Array)
], StatisticsResponseDto.prototype, "resourceUsageStats", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '차량 정비 이력', type: 'array' }),
    __metadata("design:type", Array)
], StatisticsResponseDto.prototype, "vehicleMaintenanceHistory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '소모품 정비 통계', type: 'array' }),
    __metadata("design:type", Array)
], StatisticsResponseDto.prototype, "consumableMaintenanceStats", void 0);
//# sourceMappingURL=base.dto.js.map