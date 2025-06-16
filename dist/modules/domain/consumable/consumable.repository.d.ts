import { Repository } from 'typeorm';
import { Consumable } from '@libs/entities/consumable.entity';
import { BaseRepository } from '@libs/repositories/base.repository';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';
export declare class DomainConsumableRepository extends BaseRepository<Consumable> {
    constructor(repository: Repository<Consumable>);
    count(repositoryOptions?: IRepositoryOptions<Consumable>): Promise<any>;
    bulkCreate(consumables: Consumable[], repositoryOptions?: IRepositoryOptions<Consumable>): Promise<any>;
}
