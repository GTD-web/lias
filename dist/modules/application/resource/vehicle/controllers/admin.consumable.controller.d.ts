import { CreateConsumableDto } from '../dtos/create-vehicle-info.dto';
import { UpdateConsumableDto } from '../dtos/update-vehicle-info.dto';
import { ConsumableResponseDto } from '../dtos/vehicle-response.dto';
import { Employee } from '@libs/entities';
import { ConsumableService } from '@src/application/resource/vehicle/services/consumable.service';
export declare class AdminConsumableController {
    private readonly consumableService;
    constructor(consumableService: ConsumableService);
    create(user: Employee, createConsumableDto: CreateConsumableDto): Promise<ConsumableResponseDto>;
    findAll(user: Employee, vehicleInfoId: string): Promise<ConsumableResponseDto[]>;
    findOne(user: Employee, consumableId: string): Promise<ConsumableResponseDto>;
    update(consumableId: string, user: Employee, updateConsumableDto: UpdateConsumableDto): Promise<ConsumableResponseDto>;
    remove(user: Employee, consumableId: string): Promise<void>;
}
