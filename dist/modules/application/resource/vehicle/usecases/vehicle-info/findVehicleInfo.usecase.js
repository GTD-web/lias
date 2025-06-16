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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindVehicleInfoUsecase = void 0;
const common_1 = require("@nestjs/common");
const vehicle_info_service_1 = require("@src/domain/vehicle-info/vehicle-info.service");
const error_message_1 = require("@libs/constants/error-message");
const common_2 = require("@nestjs/common");
let FindVehicleInfoUsecase = class FindVehicleInfoUsecase {
    constructor(vehicleInfoService) {
        this.vehicleInfoService = vehicleInfoService;
    }
    async execute(vehicleInfoId) {
        const vehicleInfo = await this.vehicleInfoService.findOne({
            where: { vehicleInfoId },
        });
        if (!vehicleInfo) {
            throw new common_2.NotFoundException(error_message_1.ERROR_MESSAGE.BUSINESS.VEHICLE_INFO.NOT_FOUND);
        }
        return {
            vehicleInfoId: vehicleInfo.vehicleInfoId,
            resourceId: vehicleInfo.resourceId,
            totalMileage: Number(vehicleInfo.totalMileage),
            leftMileage: Number(vehicleInfo.leftMileage),
            insuranceName: vehicleInfo.insuranceName,
            insuranceNumber: vehicleInfo.insuranceNumber,
            parkingLocationImages: vehicleInfo.parkingLocationImages,
            odometerImages: vehicleInfo.odometerImages,
            indoorImages: vehicleInfo.indoorImages,
        };
    }
};
exports.FindVehicleInfoUsecase = FindVehicleInfoUsecase;
exports.FindVehicleInfoUsecase = FindVehicleInfoUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof vehicle_info_service_1.DomainVehicleInfoService !== "undefined" && vehicle_info_service_1.DomainVehicleInfoService) === "function" ? _a : Object])
], FindVehicleInfoUsecase);
//# sourceMappingURL=findVehicleInfo.usecase.js.map