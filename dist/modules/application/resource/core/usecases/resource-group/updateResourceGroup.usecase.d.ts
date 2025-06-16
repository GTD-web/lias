import { DomainResourceGroupService } from '@src/domain/resource-group/resource-group.service';
import { UpdateResourceGroupDto } from '@src/application/resource/core/dtos/update-resource.dto';
import { ResourceGroup } from '@libs/entities/resource-group.entity';
export declare class UpdateResourceGroupUsecase {
    private readonly resourceGroupService;
    constructor(resourceGroupService: DomainResourceGroupService);
    execute(resourceGroupId: string, updateResourceGroupDto: UpdateResourceGroupDto): Promise<ResourceGroup>;
}
