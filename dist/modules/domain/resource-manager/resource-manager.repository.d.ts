import { Repository } from 'typeorm';
import { ResourceManager } from '@libs/entities/resource-manager.entity';
import { BaseRepository } from '@libs/repositories/base.repository';
export declare class DomainResourceManagerRepository extends BaseRepository<ResourceManager> {
    constructor(repository: Repository<ResourceManager>);
}
