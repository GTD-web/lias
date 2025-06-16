"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleResourceModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("@libs/entities");
const admin_vehicle_info_controller_1 = require("./controllers/admin.vehicle-info.controller");
const admin_consumable_controller_1 = require("./controllers/admin.consumable.controller");
const admin_maintenance_controller_1 = require("./controllers/admin.maintenance.controller");
const consumable_controller_1 = require("./controllers/consumable.controller");
const maintenance_controller_1 = require("./controllers/maintenance.controller");
const consumable_module_1 = require("@src/domain/consumable/consumable.module");
const maintenance_module_1 = require("@src/domain/maintenance/maintenance.module");
const vehicle_info_module_1 = require("@src/domain/vehicle-info/vehicle-info.module");
const employee_module_1 = require("@src/domain/employee/employee.module");
const notification_module_1 = require("@src/application/notification/notification.module");
const vehicle_info_service_1 = require("./services/vehicle-info.service");
const consumable_service_1 = require("./services/consumable.service");
const maintenance_service_1 = require("./services/maintenance.service");
const vehicle_info_1 = require("./usecases/vehicle-info");
const consumable_1 = require("./usecases/consumable");
const maintenance_1 = require("./usecases/maintenance");
const file_module_1 = require("@src/domain/file/file.module");
let VehicleResourceModule = class VehicleResourceModule {
};
exports.VehicleResourceModule = VehicleResourceModule;
exports.VehicleResourceModule = VehicleResourceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.VehicleInfo, entities_1.Consumable, entities_1.Maintenance, entities_1.Employee, entities_1.Notification, entities_1.File]),
            vehicle_info_module_1.DomainVehicleInfoModule,
            consumable_module_1.DomainConsumableModule,
            maintenance_module_1.DomainMaintenanceModule,
            employee_module_1.DomainEmployeeModule,
            notification_module_1.NotificationModule,
            file_module_1.DomainFileModule,
        ],
        controllers: [
            admin_vehicle_info_controller_1.AdminVehicleInfoController,
            admin_consumable_controller_1.AdminConsumableController,
            admin_maintenance_controller_1.AdminMaintenanceController,
            consumable_controller_1.UserConsumableController,
            maintenance_controller_1.UserMaintenanceController,
        ],
        providers: [
            vehicle_info_service_1.VehicleInfoService,
            consumable_service_1.ConsumableService,
            maintenance_service_1.MaintenanceService,
            vehicle_info_1.FindVehicleInfoUsecase,
            vehicle_info_1.UpdateVehicleInfoUsecase,
            consumable_1.SaveConsumableUsecase,
            consumable_1.UpdateConsumableUsecase,
            consumable_1.DeleteConsumableUsecase,
            consumable_1.FindAllConsumablesUsecase,
            consumable_1.FindOneConsumableUsecase,
            maintenance_1.SaveMaintenanceUsecase,
            maintenance_1.UpdateMaintenanceUsecase,
            maintenance_1.DeleteMaintenanceUsecase,
            maintenance_1.FindAllMaintenancesUsecase,
            maintenance_1.FindOneMaintenanceUsecase,
            maintenance_1.FindAllMaintenancesByVehicleInfoIdUsecase,
        ],
        exports: [vehicle_info_service_1.VehicleInfoService, consumable_service_1.ConsumableService, maintenance_service_1.MaintenanceService],
    })
], VehicleResourceModule);
//# sourceMappingURL=vehicle.module.js.map