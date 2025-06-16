import { DataSource } from 'typeorm';
import { Maintenance, Employee } from '@libs/entities';
import { UpdateMaintenanceDto } from '../../dtos/update-vehicle-info.dto';
import { DomainMaintenanceService } from '@src/domain/maintenance/maintenance.service';
import { DomainVehicleInfoService } from '@src/domain/vehicle-info/vehicle-info.service';
import { DomainFileService } from '@src/domain/file/file.service';
export declare class UpdateMaintenanceUsecase {
    private readonly maintenanceService;
    private readonly vehicleInfoService;
    private readonly dataSource;
    private readonly fileService;
    constructor(maintenanceService: DomainMaintenanceService, vehicleInfoService: DomainVehicleInfoService, dataSource: DataSource, fileService: DomainFileService);
    execute(user: Employee, maintenanceId: string, updateMaintenanceDto: UpdateMaintenanceDto): Promise<Maintenance>;
}
