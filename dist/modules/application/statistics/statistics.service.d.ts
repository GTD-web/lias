import { Repository } from 'typeorm';
import { ResourceUsageStats, VehicleMaintenanceHistory, ConsumableMaintenanceStats, EmployeeReservationStats } from '@libs/entities';
import { ConsumableMaintenanceStatsFilterDto, EmployeeReservationStatsFilterDto, ResourceUsageStatsFilterDto, VehicleMaintenanceHistoryFilterDto } from './dtos';
export declare class StatisticsService {
    private readonly resourceUsageStatsRepository;
    private readonly vehicleMaintenanceHistoryRepository;
    private readonly consumableMaintenanceStatsRepository;
    private readonly employeeReservationStatsRepository;
    constructor(resourceUsageStatsRepository: Repository<ResourceUsageStats>, vehicleMaintenanceHistoryRepository: Repository<VehicleMaintenanceHistory>, consumableMaintenanceStatsRepository: Repository<ConsumableMaintenanceStats>, employeeReservationStatsRepository: Repository<EmployeeReservationStats>);
    getResourceUsageStats(filter?: ResourceUsageStatsFilterDto): Promise<ResourceUsageStats[]>;
    getVehicleMaintenanceHistory(filter?: VehicleMaintenanceHistoryFilterDto): Promise<VehicleMaintenanceHistory[]>;
    getConsumableMaintenanceStats(filter?: ConsumableMaintenanceStatsFilterDto): Promise<ConsumableMaintenanceStats[]>;
    getEmployeeReservationStats(filter?: EmployeeReservationStatsFilterDto): Promise<EmployeeReservationStats[]>;
}
