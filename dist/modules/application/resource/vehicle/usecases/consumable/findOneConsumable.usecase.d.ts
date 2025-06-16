import { Employee } from '@libs/entities';
import { DomainConsumableService } from '@src/domain/consumable/consumable.service';
export declare class FindOneConsumableUsecase {
    private readonly consumableService;
    constructor(consumableService: DomainConsumableService);
    execute(user: Employee, consumableId: string): Promise<{
        consumableId: any;
        vehicleInfoId: any;
        name: any;
        replaceCycle: any;
        notifyReplacementCycle: any;
        maintenances: any;
    }>;
}
