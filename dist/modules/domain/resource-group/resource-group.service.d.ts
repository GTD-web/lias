import { DomainResourceGroupRepository } from './resource-group.repository';
import { BaseService } from '@libs/services/base.service';
import { ResourceGroup } from '@libs/entities/resource-group.entity';
import { ResourceType } from '@libs/enums/resource-type.enum';
export declare class DomainResourceGroupService extends BaseService<ResourceGroup> {
    private readonly resourceGroupRepository;
    constructor(resourceGroupRepository: DomainResourceGroupRepository);
    findByResourceGroupId(resourceGroupId: string): Promise<ResourceGroup>;
    findByType(type: ResourceType): Promise<ResourceGroup[]>;
    findByParentId(parentResourceGroupId: string): Promise<ResourceGroup[]>;
    findRootGroups(): Promise<ResourceGroup[]>;
}
