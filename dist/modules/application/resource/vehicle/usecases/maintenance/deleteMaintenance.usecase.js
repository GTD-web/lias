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
exports.DeleteMaintenanceUsecase = void 0;
const common_1 = require("@nestjs/common");
const maintenance_service_1 = require("@resource/domain/maintenance/maintenance.service");
const file_service_1 = require("@src/domain/file/file.service");
const typeorm_1 = require("typeorm");
let DeleteMaintenanceUsecase = class DeleteMaintenanceUsecase {
    constructor(maintenanceService, fileService, dataSource) {
        this.maintenanceService = maintenanceService;
        this.fileService = fileService;
        this.dataSource = dataSource;
    }
    async execute(user, maintenanceId) {
        const maintenance = await this.maintenanceService.findOne({
            where: { maintenanceId },
        });
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.maintenanceService.delete(maintenanceId, { queryRunner });
            await this.fileService.deleteFilesByFilePath(maintenance.images, { queryRunner });
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.InternalServerErrorException('Failed to delete maintenance');
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.DeleteMaintenanceUsecase = DeleteMaintenanceUsecase;
exports.DeleteMaintenanceUsecase = DeleteMaintenanceUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof maintenance_service_1.DomainMaintenanceService !== "undefined" && maintenance_service_1.DomainMaintenanceService) === "function" ? _a : Object, typeof (_b = typeof file_service_1.DomainFileService !== "undefined" && file_service_1.DomainFileService) === "function" ? _b : Object, typeorm_1.DataSource])
], DeleteMaintenanceUsecase);
//# sourceMappingURL=deleteMaintenance.usecase.js.map