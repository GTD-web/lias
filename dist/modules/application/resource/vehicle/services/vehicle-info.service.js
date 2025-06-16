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
exports.VehicleInfoService = void 0;
const common_1 = require("@nestjs/common");
const findVehicleInfo_usecase_1 = require("../usecases/vehicle-info/findVehicleInfo.usecase");
const updateVehicleInfo_usecase_1 = require("../usecases/vehicle-info/updateVehicleInfo.usecase");
let VehicleInfoService = class VehicleInfoService {
    constructor(findVehicleInfoUsecase, updateVehicleInfoUsecase) {
        this.findVehicleInfoUsecase = findVehicleInfoUsecase;
        this.updateVehicleInfoUsecase = updateVehicleInfoUsecase;
    }
    async findVehicleInfo(vehicleInfoId) {
        return this.findVehicleInfoUsecase.execute(vehicleInfoId);
    }
    async updateVehicleInfo(vehicleInfoId, updateVehicleInfoDto) {
        return this.updateVehicleInfoUsecase.execute(vehicleInfoId, updateVehicleInfoDto);
    }
};
exports.VehicleInfoService = VehicleInfoService;
exports.VehicleInfoService = VehicleInfoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [findVehicleInfo_usecase_1.FindVehicleInfoUsecase,
        updateVehicleInfo_usecase_1.UpdateVehicleInfoUsecase])
], VehicleInfoService);
//# sourceMappingURL=vehicle-info.service.js.map