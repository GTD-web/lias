import { DomainResourceGroupService } from '@src/domain/resource-group/resource-group.service';
import { CreateResourceGroupDto } from '@src/application/resource/core/dtos/create-resource.dto';
import { ResourceGroup } from '@libs/entities/resource-group.entity';
export declare class CreateResourceGroupUsecase {
    private readonly resourceGroupService;
    constructor(resourceGroupService: DomainResourceGroupService);
    execute(createResourceGroupDto: CreateResourceGroupDto): Promise<ResourceGroup>;
}
