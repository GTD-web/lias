import { CreateMaintenanceDto } from '../dtos/create-vehicle-info.dto';
import { MaintenanceResponseDto } from '../dtos/vehicle-response.dto';
import { Employee } from '@libs/entities';
import { MaintenanceService } from '@src/application/resource/vehicle/services/maintenance.service';
export declare class UserMaintenanceController {
    private readonly maintenanceService;
    constructor(maintenanceService: MaintenanceService);
    create(user: Employee, createMaintenanceDto: CreateMaintenanceDto): Promise<MaintenanceResponseDto>;
}
