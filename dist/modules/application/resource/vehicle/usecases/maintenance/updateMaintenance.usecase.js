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
exports.UpdateMaintenanceUsecase = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const error_message_1 = require("@libs/constants/error-message");
const maintenance_service_1 = require("@src/domain/maintenance/maintenance.service");
const vehicle_info_service_1 = require("@src/domain/vehicle-info/vehicle-info.service");
const file_service_1 = require("@src/domain/file/file.service");
let UpdateMaintenanceUsecase = class UpdateMaintenanceUsecase {
    constructor(maintenanceService, vehicleInfoService, dataSource, fileService) {
        this.maintenanceService = maintenanceService;
        this.vehicleInfoService = vehicleInfoService;
        this.dataSource = dataSource;
        this.fileService = fileService;
    }
    async execute(user, maintenanceId, updateMaintenanceDto) {
        if (updateMaintenanceDto.date) {
            const existingMaintenance = await this.maintenanceService.findOne({
                where: {
                    maintenanceId: (0, typeorm_1.Not)(maintenanceId),
                    consumableId: updateMaintenanceDto.consumableId,
                    date: (0, typeorm_1.MoreThan)(updateMaintenanceDto.date),
                },
            });
            if (existingMaintenance) {
                throw new common_1.BadRequestException(error_message_1.ERROR_MESSAGE.BUSINESS.MAINTENANCE.INVALID_DATE);
            }
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            if (!updateMaintenanceDto.images)
                updateMaintenanceDto.images = [];
            updateMaintenanceDto.images = updateMaintenanceDto.images.map((image) => this.fileService.getFileUrl(image));
            const maintenance = await this.maintenanceService.update(maintenanceId, updateMaintenanceDto);
            await this.fileService.updateTemporaryFiles(updateMaintenanceDto.images, false, { queryRunner });
            if (updateMaintenanceDto.mileage) {
                const savedMaintenance = await this.maintenanceService.findOne({
                    where: { maintenanceId: maintenance.maintenanceId },
                    relations: ['consumable', 'consumable.vehicleInfo'],
                    order: { createdAt: 'DESC' },
                    withDeleted: true,
                });
                if (savedMaintenance.consumable.vehicleInfo.totalMileage < updateMaintenanceDto.mileage) {
                    await this.vehicleInfoService.update(savedMaintenance.consumable.vehicleInfo.vehicleInfoId, {
                        totalMileage: updateMaintenanceDto.mileage,
                    }, { queryRunner });
                }
            }
            await queryRunner.commitTransaction();
            return await this.maintenanceService.findOne({
                where: {
                    maintenanceId: maintenanceId,
                },
            });
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
exports.UpdateMaintenanceUsecase = UpdateMaintenanceUsecase;
exports.UpdateMaintenanceUsecase = UpdateMaintenanceUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof maintenance_service_1.DomainMaintenanceService !== "undefined" && maintenance_service_1.DomainMaintenanceService) === "function" ? _a : Object, typeof (_b = typeof vehicle_info_service_1.DomainVehicleInfoService !== "undefined" && vehicle_info_service_1.DomainVehicleInfoService) === "function" ? _b : Object, typeorm_1.DataSource, typeof (_c = typeof file_service_1.DomainFileService !== "undefined" && file_service_1.DomainFileService) === "function" ? _c : Object])
], UpdateMaintenanceUsecase);
//# sourceMappingURL=updateMaintenance.usecase.js.map