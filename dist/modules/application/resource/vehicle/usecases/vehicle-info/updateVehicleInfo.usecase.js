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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVehicleInfoUsecase = void 0;
const common_1 = require("@nestjs/common");
const vehicle_info_service_1 = require("@src/domain/vehicle-info/vehicle-info.service");
const file_service_1 = require("@src/domain/file/file.service");
const typeorm_1 = require("typeorm");
const consumable_service_1 = require("@src/domain/consumable/consumable.service");
const entities_1 = require("@libs/entities");
let UpdateVehicleInfoUsecase = class UpdateVehicleInfoUsecase {
    constructor(vehicleInfoService, consumableService, fileService, dataSource) {
        this.vehicleInfoService = vehicleInfoService;
        this.consumableService = consumableService;
        this.fileService = fileService;
        this.dataSource = dataSource;
    }
    async execute(vehicleInfoId, updateVehicleInfoDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            if (!updateVehicleInfoDto.parkingLocationImages)
                updateVehicleInfoDto.parkingLocationImages = [];
            if (!updateVehicleInfoDto.odometerImages)
                updateVehicleInfoDto.odometerImages = [];
            if (!updateVehicleInfoDto.indoorImages)
                updateVehicleInfoDto.indoorImages = [];
            updateVehicleInfoDto.parkingLocationImages = updateVehicleInfoDto.parkingLocationImages.map((image) => this.fileService.getFileUrl(image));
            updateVehicleInfoDto.odometerImages = updateVehicleInfoDto.odometerImages.map((image) => this.fileService.getFileUrl(image));
            updateVehicleInfoDto.indoorImages = updateVehicleInfoDto.indoorImages.map((image) => this.fileService.getFileUrl(image));
            const vehicleInfo = await this.vehicleInfoService.update(vehicleInfoId, updateVehicleInfoDto, {
                queryRunner,
            });
            const images = [
                ...updateVehicleInfoDto.parkingLocationImages,
                ...updateVehicleInfoDto.odometerImages,
                ...updateVehicleInfoDto.indoorImages,
            ];
            if (images.length > 0) {
                await this.fileService.updateTemporaryFiles(images, false, {
                    queryRunner,
                });
            }
            const hasConsumables = await this.consumableService.count({
                where: {
                    vehicleInfoId: vehicleInfoId,
                },
            });
            if (hasConsumables === 0) {
                const sourceConsumables = await queryRunner.manager
                    .createQueryBuilder(entities_1.Consumable, 'consumable')
                    .select('DISTINCT ON (consumable.name) consumable.name, consumable.notifyReplacementCycle, consumable.replaceCycle')
                    .where('consumable.vehicleInfoId != :vehicleInfoId', { vehicleInfoId })
                    .orderBy('consumable.name', 'ASC')
                    .getRawMany();
                const newConsumables = sourceConsumables.map((consumable) => {
                    const newConsumable = new entities_1.Consumable();
                    newConsumable.vehicleInfoId = vehicleInfoId;
                    newConsumable.name = consumable.name;
                    newConsumable.notifyReplacementCycle = consumable.notifyReplacementCycle;
                    newConsumable.replaceCycle = consumable.replaceCycle;
                    newConsumable.initMileage = updateVehicleInfoDto.totalMileage || 0;
                    return newConsumable;
                });
                await this.consumableService.bulkCreate(newConsumables, {
                    queryRunner,
                });
            }
            await queryRunner.commitTransaction();
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
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.UpdateVehicleInfoUsecase = UpdateVehicleInfoUsecase;
exports.UpdateVehicleInfoUsecase = UpdateVehicleInfoUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof vehicle_info_service_1.DomainVehicleInfoService !== "undefined" && vehicle_info_service_1.DomainVehicleInfoService) === "function" ? _a : Object, typeof (_b = typeof consumable_service_1.DomainConsumableService !== "undefined" && consumable_service_1.DomainConsumableService) === "function" ? _b : Object, typeof (_c = typeof file_service_1.DomainFileService !== "undefined" && file_service_1.DomainFileService) === "function" ? _c : Object, typeorm_1.DataSource])
], UpdateVehicleInfoUsecase);
//# sourceMappingURL=updateVehicleInfo.usecase.js.map