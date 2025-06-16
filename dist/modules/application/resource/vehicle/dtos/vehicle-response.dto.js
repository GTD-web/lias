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
exports.VehicleInfoResponseDto = exports.ConsumableResponseDto = exports.MaintenanceResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const file_response_dto_1 = require("@resource/application/file/dtos/file-response.dto");
class MaintenanceResponseDto {
}
exports.MaintenanceResponseDto = MaintenanceResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MaintenanceResponseDto.prototype, "maintenanceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MaintenanceResponseDto.prototype, "consumableId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], MaintenanceResponseDto.prototype, "resourceName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], MaintenanceResponseDto.prototype, "consumableName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MaintenanceResponseDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MaintenanceResponseDto.prototype, "mileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MaintenanceResponseDto.prototype, "cost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], MaintenanceResponseDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], MaintenanceResponseDto.prototype, "mileageFromLastMaintenance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Boolean)
], MaintenanceResponseDto.prototype, "maintanceRequired", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], MaintenanceResponseDto.prototype, "previousMileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Boolean)
], MaintenanceResponseDto.prototype, "isLatest", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], MaintenanceResponseDto.prototype, "previousDate", void 0);
class ConsumableResponseDto {
}
exports.ConsumableResponseDto = ConsumableResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ConsumableResponseDto.prototype, "consumableId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ConsumableResponseDto.prototype, "vehicleInfoId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '소모품 이름' }),
    __metadata("design:type", String)
], ConsumableResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '소모품 교체 주기' }),
    __metadata("design:type", Number)
], ConsumableResponseDto.prototype, "replaceCycle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '소모품 교체 알림 주기' }),
    __metadata("design:type", Boolean)
], ConsumableResponseDto.prototype, "notifyReplacementCycle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [MaintenanceResponseDto], required: false }),
    __metadata("design:type", Array)
], ConsumableResponseDto.prototype, "maintenances", void 0);
class VehicleInfoResponseDto {
}
exports.VehicleInfoResponseDto = VehicleInfoResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VehicleInfoResponseDto.prototype, "vehicleInfoId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VehicleInfoResponseDto.prototype, "resourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VehicleInfoResponseDto.prototype, "insuranceName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VehicleInfoResponseDto.prototype, "insuranceNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], VehicleInfoResponseDto.prototype, "totalMileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], VehicleInfoResponseDto.prototype, "leftMileage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], VehicleInfoResponseDto.prototype, "parkingLocationImages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], VehicleInfoResponseDto.prototype, "odometerImages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], VehicleInfoResponseDto.prototype, "indoorImages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [file_response_dto_1.FileResponseDto], required: false }),
    __metadata("design:type", Array)
], VehicleInfoResponseDto.prototype, "parkingLocationFiles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [file_response_dto_1.FileResponseDto], required: false }),
    __metadata("design:type", Array)
], VehicleInfoResponseDto.prototype, "odometerFiles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [file_response_dto_1.FileResponseDto], required: false }),
    __metadata("design:type", Array)
], VehicleInfoResponseDto.prototype, "indoorFiles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ConsumableResponseDto], required: false }),
    __metadata("design:type", Array)
], VehicleInfoResponseDto.prototype, "consumables", void 0);
//# sourceMappingURL=vehicle-response.dto.js.map