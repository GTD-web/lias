import { DomainMaintenanceRepository } from './maintenance.repository';
import { BaseService } from '@libs/services/base.service';
import { Maintenance } from '@libs/entities/maintenance.entity';
import { IRepositoryOptions } from '@libs/interfaces/repository.interface';
export declare class DomainMaintenanceService extends BaseService<Maintenance> {
    private readonly maintenanceRepository;
    constructor(maintenanceRepository: DomainMaintenanceRepository);
    count(options: IRepositoryOptions<Maintenance>): Promise<number>;
}
