import { DomainResourceGroupService } from '@src/domain/resource-group/resource-group.service';
import { ResourceGroupResponseDto } from '@src/application/resource/core/dtos/resource-response.dto';
export declare class FindParentResourceGroupsUsecase {
    private readonly resourceGroupService;
    constructor(resourceGroupService: DomainResourceGroupService);
    execute(): Promise<ResourceGroupResponseDto[]>;
}
