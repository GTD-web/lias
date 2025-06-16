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
exports.MaintenanceService = void 0;
const common_1 = require("@nestjs/common");
const saveMaintenance_usecase_1 = require("../usecases/maintenance/saveMaintenance.usecase");
const updateMaintenance_usecase_1 = require("../usecases/maintenance/updateMaintenance.usecase");
const deleteMaintenance_usecase_1 = require("../usecases/maintenance/deleteMaintenance.usecase");
const findAllMaintenancesByVehicleInfoId_usecase_1 = require("../usecases/maintenance/findAllMaintenancesByVehicleInfoId.usecase");
const findOneMaintenance_usecase_1 = require("../usecases/maintenance/findOneMaintenance.usecase");
let MaintenanceService = class MaintenanceService {
    constructor(saveMaintenanceUsecase, updateMaintenanceUsecase, deleteMaintenanceUsecase, findAllMaintenancesByVehicleInfoIdUsecase, findOneMaintenanceUsecase) {
        this.saveMaintenanceUsecase = saveMaintenanceUsecase;
        this.updateMaintenanceUsecase = updateMaintenanceUsecase;
        this.deleteMaintenanceUsecase = deleteMaintenanceUsecase;
        this.findAllMaintenancesByVehicleInfoIdUsecase = findAllMaintenancesByVehicleInfoIdUsecase;
        this.findOneMaintenanceUsecase = findOneMaintenanceUsecase;
    }
    async save(user, createMaintenanceDto) {
        return this.saveMaintenanceUsecase.execute(user, createMaintenanceDto);
    }
    async findAllByVehicleInfoId(user, vehicleInfoId, page, limit) {
        return this.findAllMaintenancesByVehicleInfoIdUsecase.execute(user, vehicleInfoId, page, limit);
    }
    async findOne(user, maintenanceId) {
        return this.findOneMaintenanceUsecase.execute(user, maintenanceId);
    }
    async update(user, maintenanceId, updateMaintenanceDto) {
        return this.updateMaintenanceUsecase.execute(user, maintenanceId, updateMaintenanceDto);
    }
    async delete(user, maintenanceId) {
        return this.deleteMaintenanceUsecase.execute(user, maintenanceId);
    }
};
exports.MaintenanceService = MaintenanceService;
exports.MaintenanceService = MaintenanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [saveMaintenance_usecase_1.SaveMaintenanceUsecase,
        updateMaintenance_usecase_1.UpdateMaintenanceUsecase,
        deleteMaintenance_usecase_1.DeleteMaintenanceUsecase,
        findAllMaintenancesByVehicleInfoId_usecase_1.FindAllMaintenancesByVehicleInfoIdUsecase,
        findOneMaintenance_usecase_1.FindOneMaintenanceUsecase])
], MaintenanceService);
//# sourceMappingURL=maintenance.service.js.map