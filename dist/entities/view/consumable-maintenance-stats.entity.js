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
exports.ConsumableMaintenanceStats = void 0;
const typeorm_1 = require("typeorm");
let ConsumableMaintenanceStats = class ConsumableMaintenanceStats {
};
exports.ConsumableMaintenanceStats = ConsumableMaintenanceStats;
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ConsumableMaintenanceStats.prototype, "resourceId", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ConsumableMaintenanceStats.prototype, "resourceName", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ConsumableMaintenanceStats.prototype, "resourceType", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ConsumableMaintenanceStats.prototype, "vehicleInfoId", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ConsumableMaintenanceStats.prototype, "vehicleNumber", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ConsumableMaintenanceStats.prototype, "consumableId", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ConsumableMaintenanceStats.prototype, "consumableName", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ConsumableMaintenanceStats.prototype, "replaceCycle", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Boolean)
], ConsumableMaintenanceStats.prototype, "notifyReplacementCycle", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ConsumableMaintenanceStats.prototype, "maintenanceCount", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Date)
], ConsumableMaintenanceStats.prototype, "firstMaintenanceDate", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Date)
], ConsumableMaintenanceStats.prototype, "lastMaintenanceDate", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ConsumableMaintenanceStats.prototype, "totalCost", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ConsumableMaintenanceStats.prototype, "averageCost", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ConsumableMaintenanceStats.prototype, "minMileage", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ConsumableMaintenanceStats.prototype, "maxMileage", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ConsumableMaintenanceStats.prototype, "averageMileage", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ConsumableMaintenanceStats.prototype, "averageDaysBetweenMaintenances", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ConsumableMaintenanceStats.prototype, "currentYear", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ConsumableMaintenanceStats.prototype, "currentMonth", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ConsumableMaintenanceStats.prototype, "recentMaintenanceCount", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Date)
], ConsumableMaintenanceStats.prototype, "computedAt", void 0);
exports.ConsumableMaintenanceStats = ConsumableMaintenanceStats = __decorate([
    (0, typeorm_1.ViewEntity)({
        expression: `SELECT
    -- 자원 정보
    res."resourceId",
    res.name AS "resourceName",
    res.type AS "resourceType",
    
    -- 차량 정보
    vi."vehicleInfoId",
    vi."vehicleNumber",
    
    -- 소모품 정보
    c."consumableId",
    c.name AS "consumableName",
    c."replaceCycle",
    c."notifyReplacementCycle",
    
    -- 정비 통계
    COUNT(m."maintenanceId") AS "maintenanceCount",
    MIN(CAST(m.date AS timestamp)) AS "firstMaintenanceDate",
    MAX(CAST(m.date AS timestamp)) AS "lastMaintenanceDate",
    SUM(m.cost) AS "totalCost",
    AVG(m.cost) AS "averageCost",
    
    -- 마일리지 통계
    MIN(m.mileage) AS "minMileage",
    MAX(m.mileage) AS "maxMileage",
    AVG(m.mileage) AS "averageMileage",
    
    -- 정비 주기 분석
    (MAX(CAST(m.date AS timestamp)) - MIN(CAST(m.date AS timestamp))) / 
        NULLIF(COUNT(m."maintenanceId") - 1, 0) AS "averageDaysBetweenMaintenances",
    
    -- 년/월별 집계를 위한 필드
    EXTRACT(YEAR FROM NOW()) AS "currentYear",
    EXTRACT(MONTH FROM NOW()) AS "currentMonth",
    
    -- 최근 3개월 내 정비 횟수
    COUNT(CASE WHEN CAST(m.date AS timestamp) > NOW() - INTERVAL '3 months' THEN m."maintenanceId" END) AS "recentMaintenanceCount",
    
    -- 집계 시점
    NOW() AS "computedAt"
FROM
    resources res
    JOIN vehicle_infos vi ON res."resourceId" = vi."resourceId"
    JOIN consumables c ON vi."vehicleInfoId" = c."vehicleInfoId"
    LEFT JOIN maintenances m ON c."consumableId" = m."consumableId"
WHERE
    res.type = 'VEHICLE'
GROUP BY
    res."resourceId",
    res.name,
    res.type,
    vi."vehicleInfoId",
    vi."vehicleNumber",
    c."consumableId",
    c.name,
    c."replaceCycle",
    c."notifyReplacementCycle"
ORDER BY
    "resourceName",
    "consumableName"`,
    })
], ConsumableMaintenanceStats);
//# sourceMappingURL=consumable-maintenance-stats.entity.js.map