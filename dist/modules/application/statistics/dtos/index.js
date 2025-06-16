"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumableMaintenanceStatsResponseDto = exports.ConsumableMaintenanceStatsFilterDto = exports.VehicleMaintenanceHistoryResponseDto = exports.VehicleMaintenanceHistoryFilterDto = exports.ResourceUsageStatsResponseDto = exports.ResourceUsageStatsFilterDto = exports.EmployeeReservationStatsResponseDto = exports.EmployeeReservationStatsFilterDto = void 0;
var employee_reservation_stats_dto_1 = require("./employee-reservation-stats.dto");
Object.defineProperty(exports, "EmployeeReservationStatsFilterDto", { enumerable: true, get: function () { return employee_reservation_stats_dto_1.EmployeeReservationStatsFilterDto; } });
Object.defineProperty(exports, "EmployeeReservationStatsResponseDto", { enumerable: true, get: function () { return employee_reservation_stats_dto_1.EmployeeReservationStatsResponseDto; } });
var resource_usage_stats_dto_1 = require("./resource-usage-stats.dto");
Object.defineProperty(exports, "ResourceUsageStatsFilterDto", { enumerable: true, get: function () { return resource_usage_stats_dto_1.ResourceUsageStatsFilterDto; } });
Object.defineProperty(exports, "ResourceUsageStatsResponseDto", { enumerable: true, get: function () { return resource_usage_stats_dto_1.ResourceUsageStatsResponseDto; } });
var vehicle_maintenance_history_dto_1 = require("./vehicle-maintenance-history.dto");
Object.defineProperty(exports, "VehicleMaintenanceHistoryFilterDto", { enumerable: true, get: function () { return vehicle_maintenance_history_dto_1.VehicleMaintenanceHistoryFilterDto; } });
Object.defineProperty(exports, "VehicleMaintenanceHistoryResponseDto", { enumerable: true, get: function () { return vehicle_maintenance_history_dto_1.VehicleMaintenanceHistoryResponseDto; } });
var consumable_maintenance_stats_dto_1 = require("./consumable-maintenance-stats.dto");
Object.defineProperty(exports, "ConsumableMaintenanceStatsFilterDto", { enumerable: true, get: function () { return consumable_maintenance_stats_dto_1.ConsumableMaintenanceStatsFilterDto; } });
Object.defineProperty(exports, "ConsumableMaintenanceStatsResponseDto", { enumerable: true, get: function () { return consumable_maintenance_stats_dto_1.ConsumableMaintenanceStatsResponseDto; } });
__exportStar(require("./base.dto"), exports);
//# sourceMappingURL=index.js.map