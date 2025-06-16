import { ConsumableResponseDto } from '../dtos/vehicle-response.dto';
import { Employee } from '@libs/entities';
import { ConsumableService } from '@src/application/resource/vehicle/services/consumable.service';
export declare class UserConsumableController {
    private readonly consumableService;
    constructor(consumableService: ConsumableService);
    findOne(user: Employee, consumableId: string): Promise<ConsumableResponseDto>;
}
