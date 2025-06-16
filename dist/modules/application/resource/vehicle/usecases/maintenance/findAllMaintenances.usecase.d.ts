import { Employee } from '@libs/entities';
import { DomainMaintenanceService } from '@src/domain/maintenance/maintenance.service';
export declare class FindAllMaintenancesUsecase {
    private readonly maintenanceService;
    constructor(maintenanceService: DomainMaintenanceService);
    execute(user: Employee, consumableId: string): Promise<any>;
}
