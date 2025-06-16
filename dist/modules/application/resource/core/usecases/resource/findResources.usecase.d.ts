import { ResourceType } from '@libs/enums/resource-type.enum';
import { ResourceResponseDto } from '../../dtos/resource-response.dto';
import { DomainResourceService } from '@src/domain/resource/resource.service';
export declare class FindResourcesUsecase {
    private readonly resourceService;
    constructor(resourceService: DomainResourceService);
    execute(type: ResourceType): Promise<ResourceResponseDto[]>;
}
