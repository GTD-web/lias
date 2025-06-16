"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainMaintenanceModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const maintenance_service_1 = require("./maintenance.service");
const maintenance_repository_1 = require("./maintenance.repository");
const maintenance_entity_1 = require("@libs/entities/maintenance.entity");
let DomainMaintenanceModule = class DomainMaintenanceModule {
};
exports.DomainMaintenanceModule = DomainMaintenanceModule;
exports.DomainMaintenanceModule = DomainMaintenanceModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([maintenance_entity_1.Maintenance])],
        providers: [maintenance_service_1.DomainMaintenanceService, maintenance_repository_1.DomainMaintenanceRepository],
        exports: [maintenance_service_1.DomainMaintenanceService],
    })
], DomainMaintenanceModule);
//# sourceMappingURL=maintenance.module.js.map