import { Employee } from '@libs/entities';
import { DomainMaintenanceService } from '@src/domain/maintenance/maintenance.service';
export declare class FindOneMaintenanceUsecase {
    private readonly maintenanceService;
    constructor(maintenanceService: DomainMaintenanceService);
    execute(user: Employee, maintenanceId: string): Promise<{
        maintenanceId: any;
        consumableId: any;
        date: any;
        mileage: any;
        cost: any;
        images: any;
        consumableName: any;
        resourceName: any;
        previousMileage: any;
        previousDate: any;
        isLatest: boolean;
    }>;
}
