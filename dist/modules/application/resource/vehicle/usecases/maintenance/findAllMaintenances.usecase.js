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
exports.FindAllMaintenancesUsecase = void 0;
const common_1 = require("@nestjs/common");
const maintenance_service_1 = require("@src/domain/maintenance/maintenance.service");
let FindAllMaintenancesUsecase = class FindAllMaintenancesUsecase {
    constructor(maintenanceService) {
        this.maintenanceService = maintenanceService;
    }
    async execute(user, consumableId) {
        return this.maintenanceService.findAll({
            where: { consumableId },
        });
    }
};
exports.FindAllMaintenancesUsecase = FindAllMaintenancesUsecase;
exports.FindAllMaintenancesUsecase = FindAllMaintenancesUsecase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof maintenance_service_1.DomainMaintenanceService !== "undefined" && maintenance_service_1.DomainMaintenanceService) === "function" ? _a : Object])
], FindAllMaintenancesUsecase);
//# sourceMappingURL=findAllMaintenances.usecase.js.map