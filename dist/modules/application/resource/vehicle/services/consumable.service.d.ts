import { CreateConsumableDto } from '../dtos/create-vehicle-info.dto';
import { UpdateConsumableDto } from '../dtos/update-vehicle-info.dto';
import { ConsumableResponseDto } from '../dtos/vehicle-response.dto';
import { Employee } from '@libs/entities';
import { SaveConsumableUsecase } from '../usecases/consumable/saveConsumable.usecase';
import { UpdateConsumableUsecase } from '../usecases/consumable/updateConsumable.usecase';
import { DeleteConsumableUsecase } from '../usecases/consumable/deleteConsumable.usecase';
import { FindAllConsumablesUsecase } from '../usecases/consumable/findAllConsumables.usecase';
import { FindOneConsumableUsecase } from '../usecases/consumable/findOneConsumable.usecase';
export declare class ConsumableService {
    private readonly saveConsumableUsecase;
    private readonly updateConsumableUsecase;
    private readonly deleteConsumableUsecase;
    private readonly findAllConsumablesUsecase;
    private readonly findOneConsumableUsecase;
    constructor(saveConsumableUsecase: SaveConsumableUsecase, updateConsumableUsecase: UpdateConsumableUsecase, deleteConsumableUsecase: DeleteConsumableUsecase, findAllConsumablesUsecase: FindAllConsumablesUsecase, findOneConsumableUsecase: FindOneConsumableUsecase);
    save(user: Employee, createConsumableDto: CreateConsumableDto): Promise<ConsumableResponseDto>;
    findAll(user: Employee, vehicleInfoId: string): Promise<ConsumableResponseDto[]>;
    findOne(user: Employee, consumableId: string): Promise<ConsumableResponseDto>;
    update(user: Employee, consumableId: string, updateConsumableDto: UpdateConsumableDto): Promise<ConsumableResponseDto>;
    delete(user: Employee, consumableId: string): Promise<void>;
}
