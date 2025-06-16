import { ResourceType } from '@libs/enums/resource-type.enum';
import { CreateResourceResponseDto, ResourceResponseDto } from '@src/application/resource/core/dtos/resource-response.dto';
import { CreateResourceInfoDto } from '@src/application/resource/core/dtos/create-resource.dto';
import { UpdateResourceInfoDto, UpdateResourceOrdersDto } from '@src/application/resource/core/dtos/update-resource.dto';
import { ResourceService } from '@src/application/resource/core/services/resource.service';
export declare class AdminResourceController {
    private readonly resourceService;
    constructor(resourceService: ResourceService);
    createWithInfos(createResourceInfo: CreateResourceInfoDto): Promise<CreateResourceResponseDto>;
    findAll(type: ResourceType): Promise<ResourceResponseDto[]>;
    findOne(resourceId: string): Promise<ResourceResponseDto>;
    reorder(updateResourceOrdersDto: UpdateResourceOrdersDto): Promise<void>;
    update(resourceId: string, updateResourceInfoDto: UpdateResourceInfoDto): Promise<ResourceResponseDto>;
    updateAvailability(resourceId: string, updateResourceInfoDto: UpdateResourceInfoDto): Promise<ResourceResponseDto>;
    remove(resourceId: string): Promise<void>;
}
