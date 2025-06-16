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
exports.ConsumableMaintenanceStatsResponseDto = exports.ConsumableMaintenanceStatsFilterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const base_dto_1 = require("./base.dto");
class ConsumableMaintenanceStatsFilterDto extends base_dto_1.YearMonthFilterDto {
}
exports.ConsumableMaintenanceStatsFilterDto = ConsumableMaintenanceStatsFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '자원 ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConsumableMaintenanceStatsFilterDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '차량 정보 ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConsumableMaintenanceStatsFilterDto.prototype, "vehicleInfoId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '소모품 ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConsumableMaintenanceStatsFilterDto.prototype, "consumableId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '최소 정비 횟수' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], ConsumableMaintenanceStatsFilterDto.prototype, "minMaintenanceCount", void 0);
class ConsumableMaintenanceStatsResponseDto {
}
exports.ConsumableMaintenanceStatsResponseDto = ConsumableMaintenanceStatsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '자원 ID' }),
    __metadata("design:type", String)
], ConsumableMaintenanceStatsResponseDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '자원 이름' }),
    __metadata("design:type", String)
], ConsumableMaintenanceStatsResponseDto.prototype, "resourceName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '자원 유형' }),
    __metadata("design:type", String)
], ConsumableMaintenanceStatsResponseDto.prototype, "resourceType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '차량 정보 ID' }),
    __metadata("design:type", String)
], ConsumableMaintenanceStatsResponseDto.prototype, "vehicleInfoId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '차량 번호' }),
    __metadata("design:type", String)
], ConsumableMaintenanceStatsResponseDto.prototype, "vehicleNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '소모품 ID' }),
    __metadata("design:type", String)
], ConsumableMaintenanceStatsResponseDto.prototype, "consumableId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '소모품 이름' }),
    __metadata("design:type", String)
], ConsumableMaintenanceStatsResponseDto.prototype, "consumableName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '교체 주기' }),
    __metadata("design:type", Number)
], ConsumableMaintenanceStatsResponseDto.prototype, "replaceCycle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '교체 주기 알림 여부' }),
    __metadata("design:type", Boolean)
], ConsumableMaintenanceStatsResponseDto.prototype, "notifyReplacementCycle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '정비 횟수' }),
    __metadata("design:type", Number)
], ConsumableMaintenanceStatsResponseDto.prototype, "maintenanceCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '첫 정비 날짜' }),
    __metadata("design:type", Date)
], ConsumableMaintenanceStatsResponseDto.prototype, "firstMaintenanceDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '마지막 정비 날짜' }),
    __metadata("design:type", Date)
], ConsumableMaintenanceStatsResponseDto.prototype, "lastMaintenanceDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '총 비용' }),
    __metadata("design:type", Number)
], ConsumableMaintenanceStatsResponseDto.prototype, "totalCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '평균 비용' }),
    __metadata("design:type", Number)
], ConsumableMaintenanceStatsResponseDto.prototype, "averageCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '최소 주행 거리' }),
    __metadata("design:type", Number)
], ConsumableMaintenanceStatsResponseDto.prototype, "minMileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '최대 주행 거리' }),
    __metadata("design:type", Number)
], ConsumableMaintenanceStatsResponseDto.prototype, "maxMileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '평균 주행 거리' }),
    __metadata("design:type", Number)
], ConsumableMaintenanceStatsResponseDto.prototype, "averageMileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '정비 간 평균 일수' }),
    __metadata("design:type", Number)
], ConsumableMaintenanceStatsResponseDto.prototype, "averageDaysBetweenMaintenances", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '현재 연도' }),
    __metadata("design:type", Number)
], ConsumableMaintenanceStatsResponseDto.prototype, "currentYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '현재 월' }),
    __metadata("design:type", Number)
], ConsumableMaintenanceStatsResponseDto.prototype, "currentMonth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '최근 3개월 정비 횟수' }),
    __metadata("design:type", Number)
], ConsumableMaintenanceStatsResponseDto.prototype, "recentMaintenanceCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '통계 계산 시점' }),
    __metadata("design:type", Date)
], ConsumableMaintenanceStatsResponseDto.prototype, "computedAt", void 0);
//# sourceMappingURL=consumable-maintenance-stats.dto.js.map