import { Repository } from 'typeorm';
import { ResourceGroup } from '@libs/entities/resource-group.entity';
import { BaseRepository } from '@libs/repositories/base.repository';
export declare class DomainResourceGroupRepository extends BaseRepository<ResourceGroup> {
    constructor(repository: Repository<ResourceGroup>);
}
