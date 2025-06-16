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
exports.ResourceUsageStatsResponseDto = exports.ResourceUsageStatsFilterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const base_dto_1 = require("./base.dto");
class ResourceUsageStatsFilterDto extends base_dto_1.YearMonthFilterDto {
}
exports.ResourceUsageStatsFilterDto = ResourceUsageStatsFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '자원 ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResourceUsageStatsFilterDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '직원 ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResourceUsageStatsFilterDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '자원 유형' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResourceUsageStatsFilterDto.prototype, "resourceType", void 0);
class ResourceUsageStatsResponseDto {
}
exports.ResourceUsageStatsResponseDto = ResourceUsageStatsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '자원 ID' }),
    __metadata("design:type", String)
], ResourceUsageStatsResponseDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '자원 이름' }),
    __metadata("design:type", String)
], ResourceUsageStatsResponseDto.prototype, "resourceName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '자원 유형' }),
    __metadata("design:type", String)
], ResourceUsageStatsResponseDto.prototype, "resourceType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 ID' }),
    __metadata("design:type", String)
], ResourceUsageStatsResponseDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직원 이름' }),
    __metadata("design:type", String)
], ResourceUsageStatsResponseDto.prototype, "employeeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '연도' }),
    __metadata("design:type", Number)
], ResourceUsageStatsResponseDto.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '월' }),
    __metadata("design:type", Number)
], ResourceUsageStatsResponseDto.prototype, "month", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '연월 (YYYY-MM)' }),
    __metadata("design:type", String)
], ResourceUsageStatsResponseDto.prototype, "yearMonth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '예약 횟수' }),
    __metadata("design:type", Number)
], ResourceUsageStatsResponseDto.prototype, "reservationCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '총 이용 시간 (시간)' }),
    __metadata("design:type", Number)
], ResourceUsageStatsResponseDto.prototype, "totalHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '예약 횟수 순위' }),
    __metadata("design:type", Number)
], ResourceUsageStatsResponseDto.prototype, "countRank", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이용 시간 순위' }),
    __metadata("design:type", Number)
], ResourceUsageStatsResponseDto.prototype, "hoursRank", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '통계 계산 시점' }),
    __metadata("design:type", Date)
], ResourceUsageStatsResponseDto.prototype, "computedAt", void 0);
//# sourceMappingURL=resource-usage-stats.dto.js.map