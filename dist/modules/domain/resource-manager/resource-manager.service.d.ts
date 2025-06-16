import { DomainResourceManagerRepository } from './resource-manager.repository';
import { BaseService } from '@libs/services/base.service';
import { ResourceManager } from '@libs/entities/resource-manager.entity';
export declare class DomainResourceManagerService extends BaseService<ResourceManager> {
    private readonly resourceManagerRepository;
    constructor(resourceManagerRepository: DomainResourceManagerRepository);
}
