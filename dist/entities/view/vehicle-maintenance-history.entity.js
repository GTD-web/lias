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
exports.VehicleMaintenanceHistory = void 0;
const typeorm_1 = require("typeorm");
let VehicleMaintenanceHistory = class VehicleMaintenanceHistory {
};
exports.VehicleMaintenanceHistory = VehicleMaintenanceHistory;
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], VehicleMaintenanceHistory.prototype, "resourceId", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], VehicleMaintenanceHistory.prototype, "resourceName", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], VehicleMaintenanceHistory.prototype, "vehicleInfoId", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], VehicleMaintenanceHistory.prototype, "vehicleNumber", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], VehicleMaintenanceHistory.prototype, "consumableId", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], VehicleMaintenanceHistory.prototype, "consumableName", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], VehicleMaintenanceHistory.prototype, "replaceCycle", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Boolean)
], VehicleMaintenanceHistory.prototype, "notifyReplacementCycle", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], VehicleMaintenanceHistory.prototype, "maintenanceId", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], VehicleMaintenanceHistory.prototype, "maintenanceDate", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], VehicleMaintenanceHistory.prototype, "mileage", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], VehicleMaintenanceHistory.prototype, "cost", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], VehicleMaintenanceHistory.prototype, "maintananceBy", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Array)
], VehicleMaintenanceHistory.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Date)
], VehicleMaintenanceHistory.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Date)
], VehicleMaintenanceHistory.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], VehicleMaintenanceHistory.prototype, "responsibleEmployeeId", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], VehicleMaintenanceHistory.prototype, "responsibleEmployeeName", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], VehicleMaintenanceHistory.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], VehicleMaintenanceHistory.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], VehicleMaintenanceHistory.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], VehicleMaintenanceHistory.prototype, "month", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], VehicleMaintenanceHistory.prototype, "dateStr", void 0);
exports.VehicleMaintenanceHistory = VehicleMaintenanceHistory = __decorate([
    (0, typeorm_1.ViewEntity)({
        expression: `SELECT
    -- 자원 정보
    res."resourceId",
    res.name AS "resourceName",
    vi."vehicleInfoId",
    vi."vehicleNumber",
    
    -- 소모품 정보
    c."consumableId",
    c.name AS "consumableName",
    c."replaceCycle",
    c."notifyReplacementCycle",
    
    -- 정비 정보
    m."maintenanceId",
    m.date AS "maintenanceDate",
    m.mileage,
    m.cost,
    m."maintananceBy",
    m.images,
    m."createdAt",
    m."updatedAt",
    
    -- 담당자 정보
    e."employeeId" AS "responsibleEmployeeId",
    e.name AS "responsibleEmployeeName",
    e.department,
    e.position,
    
    -- 시간 정보
    EXTRACT(YEAR FROM CAST(m.date AS timestamp)) AS year,
    EXTRACT(MONTH FROM CAST(m.date AS timestamp)) AS month,
    m.date AS "dateStr"
FROM
    resources res
    JOIN vehicle_infos vi ON res."resourceId" = vi."resourceId"
    LEFT JOIN consumables c ON vi."vehicleInfoId" = c."vehicleInfoId"
    LEFT JOIN maintenances m ON c."consumableId" = m."consumableId"
    LEFT JOIN employees e ON m."maintananceBy"::uuid = e."employeeId"
WHERE
    res.type = 'VEHICLE'
    AND m."maintenanceId" IS NOT NULL
ORDER BY
    res."resourceId",
    CAST(m.date AS timestamp) DESC`,
    })
], VehicleMaintenanceHistory);
//# sourceMappingURL=vehicle-maintenance-history.entity.js.map