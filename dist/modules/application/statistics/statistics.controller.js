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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsController = void 0;
const common_1 = require("@nestjs/common");
const date_util_1 = require("@libs/utils/date.util");
const public_decorator_1 = require("@libs/decorators/public.decorator");
const swagger_1 = require("@nestjs/swagger");
const statistics_service_1 = require("./statistics.service");
const dtos_1 = require("./dtos");
let StatisticsController = class StatisticsController {
    constructor(statisticsService) {
        this.statisticsService = statisticsService;
    }
    async getVersion() {
        return {
            version: '1.0.0',
            date: date_util_1.DateUtil.now().format(),
        };
    }
    async getResourceUsageStats(filter) {
        const stats = await this.statisticsService.getResourceUsageStats(filter);
        return stats;
    }
    async getVehicleMaintenanceHistory(filter) {
        const history = await this.statisticsService.getVehicleMaintenanceHistory(filter);
        return history;
    }
    async getConsumableMaintenanceStats(filter) {
        const stats = await this.statisticsService.getConsumableMaintenanceStats(filter);
        return stats;
    }
    async getEmployeeReservationStats(filter) {
        const stats = await this.statisticsService.getEmployeeReservationStats(filter);
        return stats;
    }
    async getAllStatistics() {
        const [employeeReservationStats, resourceUsageStats, vehicleMaintenanceHistory, consumableMaintenanceStats] = await Promise.all([
            this.statisticsService.getEmployeeReservationStats({}),
            this.statisticsService.getResourceUsageStats({}),
            this.statisticsService.getVehicleMaintenanceHistory({}),
            this.statisticsService.getConsumableMaintenanceStats({}),
        ]);
        return {
            employeeReservationStats: employeeReservationStats,
            resourceUsageStats: resourceUsageStats,
            vehicleMaintenanceHistory: vehicleMaintenanceHistory,
            consumableMaintenanceStats: consumableMaintenanceStats,
        };
    }
};
exports.StatisticsController = StatisticsController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('version'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getVersion", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('resource-usage-stats'),
    (0, swagger_1.ApiOkResponse)({
        description: '자원 사용 통계 조회 성공',
        type: [dtos_1.ResourceUsageStatsResponseDto],
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.ResourceUsageStatsFilterDto]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getResourceUsageStats", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('vehicle-maintenance-history'),
    (0, swagger_1.ApiOkResponse)({
        description: '차량 정비 이력 조회 성공',
        type: [dtos_1.VehicleMaintenanceHistoryResponseDto],
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.VehicleMaintenanceHistoryFilterDto]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getVehicleMaintenanceHistory", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('consumable-maintenance-stats'),
    (0, swagger_1.ApiOkResponse)({
        description: '소모품 정비 통계 조회 성공',
        type: [dtos_1.ConsumableMaintenanceStatsResponseDto],
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.ConsumableMaintenanceStatsFilterDto]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getConsumableMaintenanceStats", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('employee-reservation-stats'),
    (0, swagger_1.ApiOkResponse)({
        description: '직원 예약 통계 조회 성공',
        type: [dtos_1.EmployeeReservationStatsResponseDto],
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.EmployeeReservationStatsFilterDto]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getEmployeeReservationStats", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('statistics'),
    (0, swagger_1.ApiOkResponse)({
        description: '모든 통계 데이터 조회 성공',
        type: dtos_1.StatisticsResponseDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "getAllStatistics", null);
exports.StatisticsController = StatisticsController = __decorate([
    (0, swagger_1.ApiTags)(`6. 통계 - 관리자 페이지`),
    (0, common_1.Controller)('v1/statistics'),
    __metadata("design:paramtypes", [statistics_service_1.StatisticsService])
], StatisticsController);
//# sourceMappingURL=statistics.controller.js.map