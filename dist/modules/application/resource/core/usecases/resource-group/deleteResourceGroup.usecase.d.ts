import { DomainResourceGroupService } from '@src/domain/resource-group/resource-group.service';
import { DomainResourceService } from '@src/domain/resource/resource.service';
import { DataSource } from 'typeorm';
export declare class DeleteResourceGroupUsecase {
    private readonly resourceGroupService;
    private readonly resourceService;
    private readonly dataSource;
    constructor(resourceGroupService: DomainResourceGroupService, resourceService: DomainResourceService, dataSource: DataSource);
    execute(resourceGroupId: string): Promise<void>;
}
