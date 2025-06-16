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
exports.EmployeeReservationStats = void 0;
const typeorm_1 = require("typeorm");
let EmployeeReservationStats = class EmployeeReservationStats {
};
exports.EmployeeReservationStats = EmployeeReservationStats;
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], EmployeeReservationStats.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], EmployeeReservationStats.prototype, "month", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], EmployeeReservationStats.prototype, "yearMonth", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], EmployeeReservationStats.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], EmployeeReservationStats.prototype, "employeeName", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], EmployeeReservationStats.prototype, "reservationCount", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], EmployeeReservationStats.prototype, "totalHours", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], EmployeeReservationStats.prototype, "avgHoursPerReservation", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], EmployeeReservationStats.prototype, "vehicleCount", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], EmployeeReservationStats.prototype, "meetingRoomCount", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], EmployeeReservationStats.prototype, "accommodationCount", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], EmployeeReservationStats.prototype, "cancellationCount", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Date)
], EmployeeReservationStats.prototype, "computedAt", void 0);
exports.EmployeeReservationStats = EmployeeReservationStats = __decorate([
    (0, typeorm_1.ViewEntity)({
        expression: `SELECT
    -- 시간 기준
    EXTRACT(YEAR FROM r."startDate") AS year,
    EXTRACT(MONTH FROM r."startDate") AS month,
    TO_CHAR(r."startDate", 'YYYY-MM') AS "yearMonth",
    
    -- 직원 정보
    rp."employeeId",
    e.name AS "employeeName",
    
    -- 예약 통계
    COUNT(DISTINCT r."reservationId") AS "reservationCount",
    SUM(EXTRACT(EPOCH FROM (r."endDate" - r."startDate"))/3600) AS "totalHours",
    AVG(EXTRACT(EPOCH FROM (r."endDate" - r."startDate"))/3600) AS "avgHoursPerReservation",
    
    -- 자원 유형별 예약 횟수
    COUNT(DISTINCT CASE WHEN res.type = 'VEHICLE' THEN r."reservationId" END) AS "vehicleCount",
    COUNT(DISTINCT CASE WHEN res.type = 'MEETING_ROOM' THEN r."reservationId" END) AS "meetingRoomCount",
    COUNT(DISTINCT CASE WHEN res.type = 'ACCOMMODATION' THEN r."reservationId" END) AS "accommodationCount",

    -- 취소 및 변경 빈도
    COUNT(DISTINCT CASE WHEN r.status = 'CANCELLED' THEN r."reservationId" END) AS "cancellationCount",
    
    -- 가장 많이 예약한 자원 (서브쿼리로 처리해야 할 수 있음)
    -- 복잡한 구현은 애플리케이션 코드에서 처리 가능
    
    -- 집계 시점
    NOW() AS "computedAt"
FROM 
    reservations r
    JOIN reservation_participants rp ON r."reservationId" = rp."reservationId"
    JOIN resources res ON r."resourceId" = res."resourceId"
    JOIN employees e ON rp."employeeId" = e."employeeId"
WHERE
    rp.type = 'RESERVER'
GROUP BY
    EXTRACT(YEAR FROM r."startDate"),
    EXTRACT(MONTH FROM r."startDate"),
    TO_CHAR(r."startDate", 'YYYY-MM'),
    rp."employeeId",
    e.name`,
    })
], EmployeeReservationStats);
//# sourceMappingURL=employee-reservation-stats.entity.js.map