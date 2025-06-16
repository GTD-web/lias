import { DataSource } from 'typeorm';
import { Maintenance, Employee } from '@libs/entities';
import { CreateMaintenanceDto } from '../../dtos/create-vehicle-info.dto';
import { DomainMaintenanceService } from '@src/domain/maintenance/maintenance.service';
import { DomainConsumableService } from '@src/domain/consumable/consumable.service';
import { DomainVehicleInfoService } from '@src/domain/vehicle-info/vehicle-info.service';
import { DomainEmployeeService } from '@src/domain/employee/employee.service';
import { NotificationService } from '@src/application/notification/services/notification.service';
import { DomainFileService } from '@src/domain/file/file.service';
export declare class SaveMaintenanceUsecase {
    private readonly maintenanceService;
    private readonly consumableService;
    private readonly vehicleInfoService;
    private readonly employeeService;
    private readonly notificationService;
    private readonly dataSource;
    private readonly fileService;
    constructor(maintenanceService: DomainMaintenanceService, consumableService: DomainConsumableService, vehicleInfoService: DomainVehicleInfoService, employeeService: DomainEmployeeService, notificationService: NotificationService, dataSource: DataSource, fileService: DomainFileService);
    execute(user: Employee, createMaintenanceDto: CreateMaintenanceDto): Promise<Maintenance>;
}
