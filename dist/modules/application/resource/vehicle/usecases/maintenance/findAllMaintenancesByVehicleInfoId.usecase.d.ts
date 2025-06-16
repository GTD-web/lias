import { Employee } from '@libs/entities';
import { DomainMaintenanceService } from '@src/domain/maintenance/maintenance.service';
import { DomainVehicleInfoService } from '@src/domain/vehicle-info/vehicle-info.service';
export declare class FindAllMaintenancesByVehicleInfoIdUsecase {
    private readonly maintenanceService;
    private readonly vehicleInfoService;
    constructor(maintenanceService: DomainMaintenanceService, vehicleInfoService: DomainVehicleInfoService);
    execute(user: Employee, vehicleInfoId: string, page: number, limit: number): Promise<{
        items: any;
        meta: {
            total: any;
            page: number;
            limit: number;
            hasNext: boolean;
        };
    }>;
}
