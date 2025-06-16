import { DomainResourceService } from '@src/domain/resource/resource.service';
import { DomainFileService } from '@src/domain/file/file.service';
import { DomainConsumableService } from '@src/domain/consumable/consumable.service';
import { DomainMaintenanceService } from '@src/domain/maintenance/maintenance.service';
import { ResourceResponseDto } from '../../dtos/resource-response.dto';
export declare class FindResourceDetailUsecase {
    private readonly resourceService;
    private readonly fileService;
    private readonly consumableService;
    private readonly maintenanceService;
    constructor(resourceService: DomainResourceService, fileService: DomainFileService, consumableService: DomainConsumableService, maintenanceService: DomainMaintenanceService);
    executeForUser(employeeId: string, resourceId: string): Promise<ResourceResponseDto>;
    executeForAdmin(resourceId: string): Promise<ResourceResponseDto>;
}
