import { Repository } from 'typeorm';
import { Maintenance } from '@libs/entities/maintenance.entity';
import { BaseRepository } from '@libs/repositories/base.repository';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';
export declare class DomainMaintenanceRepository extends BaseRepository<Maintenance> {
    constructor(repository: Repository<Maintenance>);
    count(options: IRepositoryOptions<Maintenance>): Promise<number>;
}
