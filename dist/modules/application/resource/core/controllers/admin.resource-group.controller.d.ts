import { ResourceType } from '@libs/enums/resource-type.enum';
import { CreateResourceGroupDto } from '@src/application/resource/core/dtos/create-resource.dto';
import { ResourceGroupResponseDto, ResourceGroupWithResourcesResponseDto } from '@src/application/resource/core/dtos/resource-response.dto';
import { UpdateResourceGroupDto, UpdateResourceGroupOrdersDto } from '@src/application/resource/core/dtos/update-resource.dto';
import { ResourceGroupService } from '@src/application/resource/core/services/resource-group.service';
export declare class AdminResourceGroupController {
    private readonly resourceGroupService;
    constructor(resourceGroupService: ResourceGroupService);
    findParentResourceGroups(): Promise<ResourceGroupResponseDto[]>;
    findAll(type: ResourceType): Promise<ResourceGroupWithResourcesResponseDto[]>;
    create(createResourceGroupDto: CreateResourceGroupDto): Promise<ResourceGroupResponseDto>;
    updateOrder(updateResourceGroupOrdersDto: UpdateResourceGroupOrdersDto): Promise<any>;
    update(resourceGroupId: string, updateResourceGroupDto: UpdateResourceGroupDto): Promise<ResourceGroupResponseDto>;
    remove(resourceGroupId: string): Promise<void>;
}
