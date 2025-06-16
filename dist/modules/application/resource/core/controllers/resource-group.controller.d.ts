import { ResourceType } from '@libs/enums/resource-type.enum';
import { ResourceGroupResponseDto, ResourceGroupWithResourcesResponseDto } from '@src/application/resource/core/dtos/resource-response.dto';
import { ResourceGroupService } from '@src/application/resource/core/services/resource-group.service';
export declare class UserResourceGroupController {
    private readonly resourceGroupService;
    constructor(resourceGroupService: ResourceGroupService);
    findParentResourceGroups(): Promise<ResourceGroupResponseDto[]>;
    findAll(type: ResourceType): Promise<ResourceGroupWithResourcesResponseDto[]>;
}
