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
exports.StatisticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const entities_1 = require("@libs/entities");
const typeorm_2 = require("@nestjs/typeorm");
let StatisticsService = class StatisticsService {
    constructor(resourceUsageStatsRepository, vehicleMaintenanceHistoryRepository, consumableMaintenanceStatsRepository, employeeReservationStatsRepository) {
        this.resourceUsageStatsRepository = resourceUsageStatsRepository;
        this.vehicleMaintenanceHistoryRepository = vehicleMaintenanceHistoryRepository;
        this.consumableMaintenanceStatsRepository = consumableMaintenanceStatsRepository;
        this.employeeReservationStatsRepository = employeeReservationStatsRepository;
    }
    async getResourceUsageStats(filter) {
        const where = {};
        if (filter?.year) {
            where.year = filter.year;
        }
        if (filter?.month) {
            where.month = filter.month;
        }
        if (filter?.resourceId) {
            where.resourceId = filter.resourceId;
        }
        if (filter?.employeeId) {
            where.employeeId = filter.employeeId;
        }
        if (filter?.resourceType) {
            where.resourceType = filter.resourceType;
        }
        return this.resourceUsageStatsRepository.find({ where });
    }
    async getVehicleMaintenanceHistory(filter) {
        const where = {};
        if (filter?.startDate && filter?.endDate) {
            where.maintenanceDate = (0, typeorm_1.Between)(filter.startDate, filter.endDate);
        }
        else if (filter?.startDate) {
            where.maintenanceDate = (0, typeorm_1.Between)(filter.startDate, new Date().toISOString());
        }
        if (filter?.resourceId) {
            where.resourceId = filter.resourceId;
        }
        if (filter?.vehicleInfoId) {
            where.vehicleInfoId = filter.vehicleInfoId;
        }
        if (filter?.consumableId) {
            where.consumableId = filter.consumableId;
        }
        if (filter?.responsibleEmployeeId) {
            where.responsibleEmployeeId = filter.responsibleEmployeeId;
        }
        return this.vehicleMaintenanceHistoryRepository.find({ where });
    }
    async getConsumableMaintenanceStats(filter) {
        const where = {};
        if (filter?.year) {
            where.currentYear = filter.year;
        }
        if (filter?.month) {
            where.currentMonth = filter.month;
        }
        if (filter?.resourceId) {
            where.resourceId = filter.resourceId;
        }
        if (filter?.vehicleInfoId) {
            where.vehicleInfoId = filter.vehicleInfoId;
        }
        if (filter?.consumableId) {
            where.consumableId = filter.consumableId;
        }
        if (filter?.minMaintenanceCount) {
            where.maintenanceCount = (0, typeorm_1.MoreThanOrEqual)(filter.minMaintenanceCount);
        }
        return this.consumableMaintenanceStatsRepository.find({ where });
    }
    async getEmployeeReservationStats(filter) {
        const where = {};
        if (filter?.year) {
            where.year = filter.year;
        }
        if (filter?.month) {
            where.month = filter.month;
        }
        if (filter?.employeeId) {
            where.employeeId = filter.employeeId;
        }
        if (filter?.employeeName) {
            where.employeeName = (0, typeorm_1.Like)(`%${filter.employeeName}%`);
        }
        return this.employeeReservationStatsRepository.find({ where });
    }
};
exports.StatisticsService = StatisticsService;
exports.StatisticsService = StatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(entities_1.ResourceUsageStats)),
    __param(1, (0, typeorm_2.InjectRepository)(entities_1.VehicleMaintenanceHistory)),
    __param(2, (0, typeorm_2.InjectRepository)(entities_1.ConsumableMaintenanceStats)),
    __param(3, (0, typeorm_2.InjectRepository)(entities_1.EmployeeReservationStats)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], StatisticsService);
//# sourceMappingURL=statistics.service.js.map