import { ResourceType } from '@libs/enums/resource-type.enum';
import { CreateResourceGroupDto } from '@src/application/resource/core/dtos/create-resource.dto';
import { ResourceGroupResponseDto, ResourceGroupWithResourcesResponseDto } from '@src/application/resource/core/dtos/resource-response.dto';
import { UpdateResourceGroupDto, UpdateResourceGroupOrdersDto } from '@src/application/resource/core/dtos/update-resource.dto';
import { FindParentResourceGroupsUsecase, FindResourceGroupsWithResourceDataUsecase, CreateResourceGroupUsecase, UpdateResourceGroupUsecase, ReorderResourceGroupsUsecase, DeleteResourceGroupUsecase } from '../usecases/resource-group';
export declare class ResourceGroupService {
    private readonly findParentResourceGroupsUsecase;
    private readonly findResourceGroupsWithResourceDataUsecase;
    private readonly createResourceGroupUsecase;
    private readonly updateResourceGroupUsecase;
    private readonly reorderResourceGroupsUsecase;
    private readonly deleteResourceGroupUsecase;
    constructor(findParentResourceGroupsUsecase: FindParentResourceGroupsUsecase, findResourceGroupsWithResourceDataUsecase: FindResourceGroupsWithResourceDataUsecase, createResourceGroupUsecase: CreateResourceGroupUsecase, updateResourceGroupUsecase: UpdateResourceGroupUsecase, reorderResourceGroupsUsecase: ReorderResourceGroupsUsecase, deleteResourceGroupUsecase: DeleteResourceGroupUsecase);
    findParentResourceGroups(): Promise<ResourceGroupResponseDto[]>;
    findResourceGroupsWithResourceData(type: ResourceType): Promise<ResourceGroupWithResourcesResponseDto[]>;
    createResourceGroup(createResourceGroupDto: CreateResourceGroupDto): Promise<ResourceGroupResponseDto>;
    reorderResourceGroups(updateResourceGroupOrdersDto: UpdateResourceGroupOrdersDto): Promise<void>;
    updateResourceGroup(resourceGroupId: string, updateResourceGroupDto: UpdateResourceGroupDto): Promise<ResourceGroupResponseDto>;
    deleteResourceGroup(resourceGroupId: string): Promise<void>;
    findParentResourceGroupsForUser(): Promise<ResourceGroupResponseDto[]>;
    findResourceGroupsWithResourceDataForUser(type: ResourceType): Promise<ResourceGroupWithResourcesResponseDto[]>;
}
