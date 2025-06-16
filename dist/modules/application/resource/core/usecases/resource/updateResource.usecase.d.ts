import { UpdateResourceInfoDto } from '../../dtos/update-resource.dto';
import { ResourceResponseDto } from '../../dtos/resource-response.dto';
import { DataSource } from 'typeorm';
import { DomainResourceService } from '@src/domain/resource/resource.service';
import { DomainResourceManagerService } from '@src/domain/resource-manager/resource-manager.service';
import { DomainFileService } from '@src/domain/file/file.service';
export declare class UpdateResourceUsecase {
    private readonly resourceService;
    private readonly resourceManagerService;
    private readonly dataSource;
    private readonly fileService;
    constructor(resourceService: DomainResourceService, resourceManagerService: DomainResourceManagerService, dataSource: DataSource, fileService: DomainFileService);
    execute(resourceId: string, updateRequest: UpdateResourceInfoDto): Promise<ResourceResponseDto>;
    private findResourceDetailForAdmin;
}
