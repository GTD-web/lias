import { Employee } from '@libs/entities';
import { DomainConsumableService } from '@src/domain/consumable/consumable.service';
import { UpdateConsumableDto } from '../../dtos/update-vehicle-info.dto';
import { DomainVehicleInfoService } from '@src/domain/vehicle-info/vehicle-info.service';
export declare class UpdateConsumableUsecase {
    private readonly consumableService;
    private readonly vehicleInfoService;
    constructor(consumableService: DomainConsumableService, vehicleInfoService: DomainVehicleInfoService);
    execute(user: Employee, consumableId: string, updateConsumableDto: UpdateConsumableDto): Promise<any>;
}
