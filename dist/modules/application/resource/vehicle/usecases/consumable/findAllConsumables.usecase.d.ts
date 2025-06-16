import { Employee } from '@libs/entities';
import { DomainConsumableService } from '@src/domain/consumable/consumable.service';
export declare class FindAllConsumablesUsecase {
    private readonly consumableService;
    constructor(consumableService: DomainConsumableService);
    execute(user: Employee, vehicleInfoId: string): Promise<any>;
}
