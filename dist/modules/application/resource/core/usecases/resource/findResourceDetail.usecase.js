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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindResourceDetailUsecase = void 0;
const common_1 = require("@nestjs/common");
const resource_service_1 = require("@src/domain/resource/resource.service");
const file_service_1 = require("@src/domain/file/file.service");
const consumable_service_1 = require("@src/domain/consumable/consumable.service");
const maintenance_service_1 = require("@src/domain/maintenance/maintenance.service");
const resource_response_dto_1 = require("../../dtos/resource-response.dto");
const error_message_1 = require("@libs/constants/error-message");
let FindResourceDetailUsecase = class FindResourceDetailUsecase {
    constructor(resourceService, fileService, consumableService, maintenanceService) {
        this.resourceService = resourceService;
        this.fileService = fileService;
        this.consumableService = consumableService;
        this.maintenanceService = maintenanceService;
    }
    async executeForUser(employeeId, resourceId) {
        const resource = await this.resourceService.findOne({
            where: { resourceId: resourceId },
            relations: [
                'resourceGroup',
                'vehicleInfo',
                'meetingRoomInfo',
                'accommodationInfo',
                'resourceManagers',
                'resourceManagers.employee',
            ],
        });
        if (!resource) {
            throw new common_1.NotFoundException(error_message_1.ERROR_MESSAGE.BUSINESS.RESOURCE.NOT_FOUND);
        }
        resource['imageFiles'] = await this.fileService.findAllFilesByFilePath(resource.images);
        if (resource.vehicleInfo) {
            if (resource.resourceManagers.some((manager) => manager.employeeId === employeeId)) {
                resource.vehicleInfo['consumables'] = await this.consumableService.findAll({
                    where: { vehicleInfoId: resource.vehicleInfo.vehicleInfoId },
                });
            }
            if (resource.vehicleInfo.consumables && resource.vehicleInfo.consumables.length > 0) {
                const mileage = Number(resource.vehicleInfo.totalMileage);
                for (const consumable of resource.vehicleInfo.consumables) {
                    const replaceCycle = Number(consumable.replaceCycle);
                    const latestMaintenance = await this.maintenanceService.findOne({
                        where: { consumableId: consumable.consumableId },
                        order: { date: 'DESC' },
                    });
                    if (latestMaintenance) {
                        consumable.maintenances = [latestMaintenance].map((maintenance) => {
                            return {
                                ...maintenance,
                                mileageFromLastMaintenance: mileage - Number(maintenance.mileage),
                                maintanceRequired: mileage - Number(maintenance.mileage) > replaceCycle,
                            };
                        });
                    }
                }
                resource.vehicleInfo.consumables.sort((a, b) => {
                    if (!a.maintenances?.length && !b.maintenances?.length) {
                        return a.name.localeCompare(b.name);
                    }
                    if (!a.maintenances?.length)
                        return -1;
                    if (!b.maintenances?.length)
                        return 1;
                    const aMileage = a.maintenances[0]?.['mileageFromLastMaintenance'] || 0;
                    const bMileage = b.maintenances[0]?.['mileageFromLastMaintenance'] || 0;
                    return aMileage - bMileage;
                });
            }
            resource.vehicleInfo['parkingLocationFiles'] = await this.fileService.findAllFilesByFilePath(resource.vehicleInfo.parkingLocationImages);
            resource.vehicleInfo['odometerFiles'] = await this.fileService.findAllFilesByFilePath(resource.vehicleInfo.odometerImages);
            resource.vehicleInfo['indoorFiles'] = await this.fileService.findAllFilesByFilePath(resource.vehicleInfo.indoorImages);
        }
        return new resource_response_dto_1.ResourceResponseDto(resource);
    }
    async executeForAdmin(resourceId) {
        const resource = await this.resourceService.findOne({
            where: { resourceId: resourceId },
            relations: [
                'resourceGroup',
                'vehicleInfo',
                'vehicleInfo.consumables',
                'meetingRoomInfo',
                'accommodationInfo',
                'resourceManagers',
                'resourceManagers.employee',
            ],
        });
        if (!resource) {
            throw new common_1.NotFoundException(error_message_1.ERROR_MESSAGE.BUSINESS.RESOURCE.NOT_FOUND);
        }
        resource['imageFiles'] = await this.fileService.findAllFilesByFilePath(resource.images);
        if (resource.vehicleInfo) {
            if (resource.vehicleInfo.consumables) {
                const mileage = Number(resource.vehicleInfo.totalMileage);
                for (const consumable of resource.vehicleInfo.consumables) {
                    const initMileage = Number(consumable.initMileage);
                    const replaceCycle = Number(consumable.replaceCycle);
                    const latestMaintenance = await this.maintenanceService.findOne({
                        where: { consumableId: consumable.consumableId },
                        order: { date: 'DESC' },
                    });
                    if (latestMaintenance) {
                        consumable.maintenances = [latestMaintenance].map((maintenance) => {
                            return {
                                ...maintenance,
                                mileageFromLastMaintenance: mileage - Number(maintenance.mileage),
                                maintanceRequired: mileage - Number(maintenance.mileage) > replaceCycle,
                            };
                        });
                    }
                    else {
                        consumable['mileageFromLastMaintenance'] = mileage - initMileage;
                        consumable['maintanceRequired'] = mileage - initMileage > replaceCycle;
                    }
                }
                resource.vehicleInfo.consumables.sort((a, b) => {
                    const aRequired = !!a.maintenances?.[0]?.['maintanceRequired'] || !!a['maintanceRequired'];
                    const bRequired = !!b.maintenances?.[0]?.['maintanceRequired'] || !!b['maintanceRequired'];
                    if (aRequired !== bRequired) {
                        return aRequired ? -1 : 1;
                    }
                    const aReplaceCycle = a['replaceCycle'];
                    const bReplaceCycle = b['replaceCycle'];
                    const aMileage = ((a.maintenances?.[0]?.['mileageFromLastMaintenance'] || a['mileageFromLastMaintenance']) /
                        aReplaceCycle) *
                        100;
                    const bMileage = ((b.maintenances?.[0]?.['mileageFromLastMaintenance'] || b['mileageFromLastMaintenance']) /
                        bReplaceCycle) *
                        100;
                    if (bMileage !== aMileage) {
                        return bMileage - aMileage;
                    }
                    return bReplaceCycle - aReplaceCycle;
                });
            }
            resource.vehicleInfo['parkingLocationFiles'] = await this.fileService.findAllFilesByFilePath(resource.vehicleInfo.parkingLocationImages);
            resource.vehicleInfo['odometerFiles'] = await this.fileService.findAllFilesByFilePath(resource.vehicleInfo.odometerImages);
            resource.vehicleInfo['indoorFiles'] = await this.fileService.findAllFilesByFilePath(resource.vehicleInfo.indoorImages);
        }
        return new resource_response_dto_1.ResourceResponseDto(resource);
    }
};
exports.FindResourceDetailUsecase = FindResourceDetailUsecase;
exports.FindResourceDetailUsecase = FindResourceDetailUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof resource_service_1.DomainResourceService !== "undefined" && resource_service_1.DomainResourceService) === "function" ? _a : Object, typeof (_b = typeof file_service_1.DomainFileService !== "undefined" && file_service_1.DomainFileService) === "function" ? _b : Object, typeof (_c = typeof consumable_service_1.DomainConsumableService !== "undefined" && consumable_service_1.DomainConsumableService) === "function" ? _c : Object, typeof (_d = typeof maintenance_service_1.DomainMaintenanceService !== "undefined" && maintenance_service_1.DomainMaintenanceService) === "function" ? _d : Object])
], FindResourceDetailUsecase);
//# sourceMappingURL=findResourceDetail.usecase.js.map