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
exports.DomainVehicleInfoService = void 0;
const common_1 = require("@nestjs/common");
const vehicle_info_repository_1 = require("./vehicle-info.repository");
const base_service_1 = require("@libs/services/base.service");
let DomainVehicleInfoService = class DomainVehicleInfoService extends base_service_1.BaseService {
    constructor(vehicleInfoRepository) {
        super(vehicleInfoRepository);
        this.vehicleInfoRepository = vehicleInfoRepository;
    }
    async findByVehicleInfoId(vehicleInfoId) {
        const vehicleInfo = await this.vehicleInfoRepository.findOne({
            where: { vehicleInfoId },
        });
        if (!vehicleInfo) {
            throw new common_1.NotFoundException('차량 정보를 찾을 수 없습니다.');
        }
        return vehicleInfo;
    }
    async findByResourceId(resourceId) {
        const vehicleInfo = await this.vehicleInfoRepository.findOne({
            where: { resourceId },
        });
        if (!vehicleInfo) {
            throw new common_1.NotFoundException('차량 정보를 찾을 수 없습니다.');
        }
        return vehicleInfo;
    }
};
exports.DomainVehicleInfoService = DomainVehicleInfoService;
exports.DomainVehicleInfoService = DomainVehicleInfoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [vehicle_info_repository_1.DomainVehicleInfoRepository])
], DomainVehicleInfoService);
//# sourceMappingURL=vehicle-info.service.js.map