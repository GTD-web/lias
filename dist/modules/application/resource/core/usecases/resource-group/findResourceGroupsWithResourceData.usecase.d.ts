import { DomainResourceService } from '@src/domain/resource/resource.service';
import { DomainResourceGroupService } from '@src/domain/resource-group/resource-group.service';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ResourceGroupWithResourcesResponseDto } from '@src/application/resource/core/dtos/resource-response.dto';
export declare class FindResourceGroupsWithResourceDataUsecase {
    private readonly resourceService;
    private readonly resourceGroupService;
    constructor(resourceService: DomainResourceService, resourceGroupService: DomainResourceGroupService);
    execute(type?: ResourceType): Promise<ResourceGroupWithResourcesResponseDto[]>;
}
