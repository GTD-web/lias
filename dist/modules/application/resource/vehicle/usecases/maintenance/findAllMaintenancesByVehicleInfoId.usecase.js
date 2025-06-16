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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllMaintenancesByVehicleInfoIdUsecase = void 0;
const common_1 = require("@nestjs/common");
const maintenance_service_1 = require("@src/domain/maintenance/maintenance.service");
const typeorm_1 = require("typeorm");
const vehicle_info_service_1 = require("@src/domain/vehicle-info/vehicle-info.service");
let FindAllMaintenancesByVehicleInfoIdUsecase = class FindAllMaintenancesByVehicleInfoIdUsecase {
    constructor(maintenanceService, vehicleInfoService) {
        this.maintenanceService = maintenanceService;
        this.vehicleInfoService = vehicleInfoService;
    }
    async execute(user, vehicleInfoId, page, limit) {
        const vehicleInfo = await this.vehicleInfoService.findOne({
            where: { vehicleInfoId },
            relations: ['resource', 'consumables', 'consumables.maintenances'],
            withDeleted: true,
        });
        const options = {
            where: {
                maintenanceId: (0, typeorm_1.In)(vehicleInfo.consumables.flatMap((consumable) => consumable.maintenances.map((maintenance) => maintenance.maintenanceId))),
            },
            withDeleted: true,
        };
        const count = await this.maintenanceService.count(options);
        if (page && limit) {
            options.skip = (page - 1) * limit;
            options.take = limit;
        }
        options.relations = ['consumable'];
        options.order = { createdAt: 'DESC' };
        const maintenances = await this.maintenanceService.findAll(options);
        return {
            items: maintenances.map((maintenance, index, array) => ({
                maintenanceId: maintenance.maintenanceId,
                consumableId: maintenance.consumableId,
                date: maintenance.date,
                mileage: maintenance.mileage,
                cost: maintenance.cost,
                images: maintenance.images,
                consumableName: maintenance.consumable.name,
                resourceName: vehicleInfo.resource.name,
                previousMileage: index !== array.length - 1 ? array[index + 1].mileage : 0,
                isLatest: index === 0,
            })),
            meta: {
                total: count,
                page,
                limit,
                hasNext: page * limit < count,
            },
        };
    }
};
exports.FindAllMaintenancesByVehicleInfoIdUsecase = FindAllMaintenancesByVehicleInfoIdUsecase;
exports.FindAllMaintenancesByVehicleInfoIdUsecase = FindAllMaintenancesByVehicleInfoIdUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof maintenance_service_1.DomainMaintenanceService !== "undefined" && maintenance_service_1.DomainMaintenanceService) === "function" ? _a : Object, typeof (_b = typeof vehicle_info_service_1.DomainVehicleInfoService !== "undefined" && vehicle_info_service_1.DomainVehicleInfoService) === "function" ? _b : Object])
], FindAllMaintenancesByVehicleInfoIdUsecase);
//# sourceMappingURL=findAllMaintenancesByVehicleInfoId.usecase.js.map