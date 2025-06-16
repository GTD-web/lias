import { CreateMaintenanceDto } from '../dtos/create-vehicle-info.dto';
import { UpdateMaintenanceDto } from '../dtos/update-vehicle-info.dto';
import { MaintenanceResponseDto } from '../dtos/vehicle-response.dto';
import { Employee } from '@libs/entities';
import { PaginationQueryDto } from '@libs/dtos/paginate-query.dto';
import { PaginationData } from '@libs/dtos/paginate-response.dto';
import { MaintenanceService } from '@src/application/resource/vehicle/services/maintenance.service';
export declare class AdminMaintenanceController {
    private readonly maintenanceService;
    constructor(maintenanceService: MaintenanceService);
    create(user: Employee, createMaintenanceDto: CreateMaintenanceDto): Promise<MaintenanceResponseDto>;
    findAll(user: Employee, vehicleInfoId: string, query: PaginationQueryDto): Promise<PaginationData<MaintenanceResponseDto>>;
    findOne(user: Employee, maintenanceId: string): Promise<MaintenanceResponseDto>;
    update(maintenanceId: string, updateMaintenanceDto: UpdateMaintenanceDto, user: Employee): Promise<MaintenanceResponseDto>;
    remove(user: Employee, maintenanceId: string): Promise<void>;
}
