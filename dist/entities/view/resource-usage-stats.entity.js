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
exports.ResourceUsageStats = void 0;
const typeorm_1 = require("typeorm");
let ResourceUsageStats = class ResourceUsageStats {
};
exports.ResourceUsageStats = ResourceUsageStats;
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ResourceUsageStats.prototype, "resourceId", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ResourceUsageStats.prototype, "resourceName", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ResourceUsageStats.prototype, "resourceType", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ResourceUsageStats.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ResourceUsageStats.prototype, "employeeName", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ResourceUsageStats.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ResourceUsageStats.prototype, "month", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], ResourceUsageStats.prototype, "yearMonth", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ResourceUsageStats.prototype, "reservationCount", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ResourceUsageStats.prototype, "totalHours", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ResourceUsageStats.prototype, "countRank", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], ResourceUsageStats.prototype, "hoursRank", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Date)
], ResourceUsageStats.prototype, "computedAt", void 0);
exports.ResourceUsageStats = ResourceUsageStats = __decorate([
    (0, typeorm_1.ViewEntity)({
        expression: `SELECT
    -- 자원 정보
    res."resourceId",
    res.name AS "resourceName",
    res.type AS "resourceType",
    
    -- 직원 정보
    rp."employeeId",
    e.name AS "employeeName",
    
    -- 시간 기준
    EXTRACT(YEAR FROM r."startDate") AS year,
    EXTRACT(MONTH FROM r."startDate") AS month,
    TO_CHAR(r."startDate", 'YYYY-MM') AS "yearMonth",
    
    -- 이용 통계
    COUNT(DISTINCT r."reservationId") AS "reservationCount",
    SUM(EXTRACT(EPOCH FROM (r."endDate" - r."startDate"))/3600) AS "totalHours",
    
    -- 순위 계산 (동일 자원에 대한 직원별 예약 횟수 순위)
    RANK() OVER (
        PARTITION BY res."resourceId", EXTRACT(YEAR FROM r."startDate"), EXTRACT(MONTH FROM r."startDate")
        ORDER BY COUNT(DISTINCT r."reservationId") DESC
    ) AS "countRank",
    
    -- 시간 기준 순위 계산
    RANK() OVER (
        PARTITION BY res."resourceId", EXTRACT(YEAR FROM r."startDate"), EXTRACT(MONTH FROM r."startDate")
        ORDER BY SUM(EXTRACT(EPOCH FROM (r."endDate" - r."startDate"))/3600) DESC
    ) AS "hoursRank",
    
    -- 집계 시점
    NOW() AS "computedAt"
FROM 
    reservations r
    JOIN reservation_participants rp ON r."reservationId" = rp."reservationId"
    JOIN resources res ON r."resourceId" = res."resourceId"
    JOIN employees e ON rp."employeeId" = e."employeeId"
WHERE
    rp.type = 'RESERVER' -- 예약 주체만 집계
    AND r.status <> 'CANCELLED' -- 취소된 예약 제외
GROUP BY
    res."resourceId",
    res.name,
    res.type,
    rp."employeeId",
    e.name,
    EXTRACT(YEAR FROM r."startDate"),
    EXTRACT(MONTH FROM r."startDate"),
    TO_CHAR(r."startDate", 'YYYY-MM')
ORDER BY
    res."resourceId",
    year,
    month,
    "reservationCount" DESC,
    "totalHours" DESC`,
    })
], ResourceUsageStats);
//# sourceMappingURL=resource-usage-stats.entity.js.map