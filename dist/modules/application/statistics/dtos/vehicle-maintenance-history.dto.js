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
exports.VehicleMaintenanceHistoryResponseDto = exports.VehicleMaintenanceHistoryFilterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const base_dto_1 = require("./base.dto");
class VehicleMaintenanceHistoryFilterDto extends base_dto_1.DateRangeFilterDto {
}
exports.VehicleMaintenanceHistoryFilterDto = VehicleMaintenanceHistoryFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '자원 ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VehicleMaintenanceHistoryFilterDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '차량 정보 ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VehicleMaintenanceHistoryFilterDto.prototype, "vehicleInfoId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '소모품 ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VehicleMaintenanceHistoryFilterDto.prototype, "consumableId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: '담당자 ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VehicleMaintenanceHistoryFilterDto.prototype, "responsibleEmployeeId", void 0);
class VehicleMaintenanceHistoryResponseDto {
}
exports.VehicleMaintenanceHistoryResponseDto = VehicleMaintenanceHistoryResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '자원 ID' }),
    __metadata("design:type", String)
], VehicleMaintenanceHistoryResponseDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '자원 이름' }),
    __metadata("design:type", String)
], VehicleMaintenanceHistoryResponseDto.prototype, "resourceName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '차량 정보 ID' }),
    __metadata("design:type", String)
], VehicleMaintenanceHistoryResponseDto.prototype, "vehicleInfoId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '차량 번호' }),
    __metadata("design:type", String)
], VehicleMaintenanceHistoryResponseDto.prototype, "vehicleNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '소모품 ID' }),
    __metadata("design:type", String)
], VehicleMaintenanceHistoryResponseDto.prototype, "consumableId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '소모품 이름' }),
    __metadata("design:type", String)
], VehicleMaintenanceHistoryResponseDto.prototype, "consumableName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '교체 주기' }),
    __metadata("design:type", Number)
], VehicleMaintenanceHistoryResponseDto.prototype, "replaceCycle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '교체 주기 알림 여부' }),
    __metadata("design:type", Boolean)
], VehicleMaintenanceHistoryResponseDto.prototype, "notifyReplacementCycle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '정비 ID' }),
    __metadata("design:type", String)
], VehicleMaintenanceHistoryResponseDto.prototype, "maintenanceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '정비 날짜' }),
    __metadata("design:type", String)
], VehicleMaintenanceHistoryResponseDto.prototype, "maintenanceDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '주행 거리' }),
    __metadata("design:type", Number)
], VehicleMaintenanceHistoryResponseDto.prototype, "mileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '비용' }),
    __metadata("design:type", Number)
], VehicleMaintenanceHistoryResponseDto.prototype, "cost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '정비 담당자 ID' }),
    __metadata("design:type", String)
], VehicleMaintenanceHistoryResponseDto.prototype, "maintananceBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '정비 이미지' }),
    __metadata("design:type", Array)
], VehicleMaintenanceHistoryResponseDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '생성 시간' }),
    __metadata("design:type", Date)
], VehicleMaintenanceHistoryResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '업데이트 시간' }),
    __metadata("design:type", Date)
], VehicleMaintenanceHistoryResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '담당 직원 ID' }),
    __metadata("design:type", String)
], VehicleMaintenanceHistoryResponseDto.prototype, "responsibleEmployeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '담당 직원 이름' }),
    __metadata("design:type", String)
], VehicleMaintenanceHistoryResponseDto.prototype, "responsibleEmployeeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '부서' }),
    __metadata("design:type", String)
], VehicleMaintenanceHistoryResponseDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '직급' }),
    __metadata("design:type", String)
], VehicleMaintenanceHistoryResponseDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '연도' }),
    __metadata("design:type", Number)
], VehicleMaintenanceHistoryResponseDto.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '월' }),
    __metadata("design:type", Number)
], VehicleMaintenanceHistoryResponseDto.prototype, "month", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '날짜 문자열' }),
    __metadata("design:type", String)
], VehicleMaintenanceHistoryResponseDto.prototype, "dateStr", void 0);
//# sourceMappingURL=vehicle-maintenance-history.dto.js.map