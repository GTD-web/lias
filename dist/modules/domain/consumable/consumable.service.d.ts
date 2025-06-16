import { DomainConsumableRepository } from './consumable.repository';
import { BaseService } from '@libs/services/base.service';
import { Consumable } from '@libs/entities/consumable.entity';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';
export declare class DomainConsumableService extends BaseService<Consumable> {
    private readonly consumableRepository;
    constructor(consumableRepository: DomainConsumableRepository);
    findByConsumableId(consumableId: string): Promise<Consumable>;
    findByVehicleInfoId(vehicleInfoId: string): Promise<Consumable[]>;
    findNeedReplacement(): Promise<Consumable[]>;
    bulkCreate(consumables: Consumable[], repositoryOptions?: IRepositoryOptions<Consumable>): Promise<any>;
    count(repositoryOptions?: IRepositoryOptions<Consumable>): Promise<any>;
}
