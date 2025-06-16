import { DomainResourceGroupService } from '@src/domain/resource-group/resource-group.service';
import { UpdateResourceGroupOrdersDto } from '@src/application/resource/core/dtos/update-resource.dto';
import { DataSource } from 'typeorm';
export declare class ReorderResourceGroupsUsecase {
    private readonly resourceGroupService;
    private readonly dataSource;
    constructor(resourceGroupService: DomainResourceGroupService, dataSource: DataSource);
    execute(updateResourceGroupOrdersDto: UpdateResourceGroupOrdersDto): Promise<void>;
}
