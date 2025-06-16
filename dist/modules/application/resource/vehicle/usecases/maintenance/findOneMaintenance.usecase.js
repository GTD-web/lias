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
exports.FindOneMaintenanceUsecase = void 0;
const common_1 = require("@nestjs/common");
const maintenance_service_1 = require("@src/domain/maintenance/maintenance.service");
const typeorm_1 = require("typeorm");
let FindOneMaintenanceUsecase = class FindOneMaintenanceUsecase {
    constructor(maintenanceService) {
        this.maintenanceService = maintenanceService;
    }
    async execute(user, maintenanceId) {
        const maintenance = await this.maintenanceService.findOne({
            where: { maintenanceId },
            relations: ['consumable', 'consumable.vehicleInfo', 'consumable.vehicleInfo.resource'],
            withDeleted: true,
        });
        const previousMaintenance = await this.maintenanceService.findOne({
            where: { consumableId: maintenance.consumableId, createdAt: (0, typeorm_1.LessThan)(maintenance.createdAt) },
            order: { createdAt: 'DESC' },
        });
        maintenance.createdAt.setTime(maintenance.createdAt.getTime() + 1);
        const nextMaintenance = await this.maintenanceService.findOne({
            where: { consumableId: maintenance.consumableId, createdAt: (0, typeorm_1.MoreThan)(maintenance.createdAt) },
            order: { createdAt: 'ASC' },
        });
        return {
            maintenanceId: maintenance.maintenanceId,
            consumableId: maintenance.consumableId,
            date: maintenance.date,
            mileage: maintenance.mileage,
            cost: maintenance.cost,
            images: maintenance.images,
            consumableName: maintenance.consumable.name,
            resourceName: maintenance.consumable.vehicleInfo.resource.name,
            previousMileage: previousMaintenance ? previousMaintenance.mileage : 0,
            previousDate: previousMaintenance ? previousMaintenance.date : null,
            isLatest: !nextMaintenance,
        };
    }
};
exports.FindOneMaintenanceUsecase = FindOneMaintenanceUsecase;
exports.FindOneMaintenanceUsecase = FindOneMaintenanceUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof maintenance_service_1.DomainMaintenanceService !== "undefined" && maintenance_service_1.DomainMaintenanceService) === "function" ? _a : Object])
], FindOneMaintenanceUsecase);
//# sourceMappingURL=findOneMaintenance.usecase.js.map