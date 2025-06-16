import { StatisticsService } from './statistics.service';
import { ConsumableMaintenanceStatsFilterDto, ConsumableMaintenanceStatsResponseDto, EmployeeReservationStatsFilterDto, EmployeeReservationStatsResponseDto, ResourceUsageStatsFilterDto, ResourceUsageStatsResponseDto, StatisticsResponseDto, VehicleMaintenanceHistoryFilterDto, VehicleMaintenanceHistoryResponseDto } from './dtos';
export declare class StatisticsController {
    private readonly statisticsService;
    constructor(statisticsService: StatisticsService);
    getVersion(): Promise<{
        version: string;
        date: string;
    }>;
    getResourceUsageStats(filter: ResourceUsageStatsFilterDto): Promise<ResourceUsageStatsResponseDto[]>;
    getVehicleMaintenanceHistory(filter: VehicleMaintenanceHistoryFilterDto): Promise<VehicleMaintenanceHistoryResponseDto[]>;
    getConsumableMaintenanceStats(filter: ConsumableMaintenanceStatsFilterDto): Promise<ConsumableMaintenanceStatsResponseDto[]>;
    getEmployeeReservationStats(filter: EmployeeReservationStatsFilterDto): Promise<EmployeeReservationStatsResponseDto[]>;
    getAllStatistics(): Promise<StatisticsResponseDto>;
}
