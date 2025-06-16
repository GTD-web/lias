import { DomainResourceService } from '@src/domain/resource/resource.service';
import { DomainResourceManagerService } from '@src/domain/resource-manager/resource-manager.service';
import { DataSource } from 'typeorm';
export declare class DeleteResourceUsecase {
    private readonly resourceService;
    private readonly resourceManagerService;
    private readonly dataSource;
    constructor(resourceService: DomainResourceService, resourceManagerService: DomainResourceManagerService, dataSource: DataSource);
    execute(resourceId: string): Promise<void>;
}
