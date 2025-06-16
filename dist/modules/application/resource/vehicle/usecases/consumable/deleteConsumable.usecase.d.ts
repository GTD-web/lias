import { Employee } from '@libs/entities';
import { DomainConsumableService } from '@src/domain/consumable/consumable.service';
export declare class DeleteConsumableUsecase {
    private readonly consumableService;
    constructor(consumableService: DomainConsumableService);
    execute(user: Employee, consumableId: string): Promise<void>;
}
