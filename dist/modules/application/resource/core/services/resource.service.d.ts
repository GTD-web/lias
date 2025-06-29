import { ResourceType } from '@libs/enums/resource-type.enum';
import { Employee } from '@libs/entities';
import { ResourceResponseDto, ResourceGroupWithResourcesAndReservationsResponseDto, CreateResourceResponseDto } from '@src/application/resource/core/dtos/resource-response.dto';
import { ResourceAvailabilityDto } from '@src/application/resource/core/dtos/available-time-response.dto';
import { ResourceQueryDto } from '@src/application/resource/core/dtos/resource-query.dto';
import { CreateResourceInfoDto } from '@src/application/resource/core/dtos/create-resource.dto';
import { UpdateResourceInfoDto, UpdateResourceOrdersDto } from '@src/application/resource/core/dtos/update-resource.dto';
import { FindResourcesUsecase, FindResourceDetailUsecase, ReorderResourcesUsecase, UpdateResourceUsecase, DeleteResourceUsecase, CreateResourceWithInfosUsecase, CheckAvailabilityUsecase, FindAvailableTimeUsecase, FindResourcesByTypeAndDateWithReservationsUsecase } from '@src/application/resource/core/usecases/resource';
export declare class ResourceService {
    private readonly findResourcesUsecase;
    private readonly findResourceDetailUsecase;
    private readonly reorderResourcesUsecase;
    private readonly updateResourceUsecase;
    private readonly deleteResourceUsecase;
    private readonly findAvailableTimeUsecase;
    private readonly findResourcesByTypeAndDateWithReservationsUsecase;
    private readonly checkAvailabilityUsecase;
    private readonly createResourceWithInfosUsecase;
    constructor(findResourcesUsecase: FindResourcesUsecase, findResourceDetailUsecase: FindResourceDetailUsecase, reorderResourcesUsecase: ReorderResourcesUsecase, updateResourceUsecase: UpdateResourceUsecase, deleteResourceUsecase: DeleteResourceUsecase, findAvailableTimeUsecase: FindAvailableTimeUsecase, findResourcesByTypeAndDateWithReservationsUsecase: FindResourcesByTypeAndDateWithReservationsUsecase, checkAvailabilityUsecase: CheckAvailabilityUsecase, createResourceWithInfosUsecase: CreateResourceWithInfosUsecase);
    createResourceWithInfos(createResourceInfo: CreateResourceInfoDto): Promise<CreateResourceResponseDto>;
    findResources(type: ResourceType): Promise<ResourceResponseDto[]>;
    findResourceDetailForAdmin(resourceId: string): Promise<ResourceResponseDto>;
    reorderResources(updateResourceOrdersDto: UpdateResourceOrdersDto): Promise<void>;
    updateResource(resourceId: string, updateResourceInfoDto: UpdateResourceInfoDto): Promise<ResourceResponseDto>;
    deleteResource(resourceId: string): Promise<void>;
    findResourcesByTypeAndDateWithReservations(user: Employee, type: ResourceType, startDate: string, endDate: string, isMine: boolean): Promise<ResourceGroupWithResourcesAndReservationsResponseDto[]>;
    findAvailableTime(query: ResourceQueryDto): Promise<ResourceAvailabilityDto[]>;
    checkAvailability(resourceId: string, startDate: string, endDate: string, reservationId?: string): Promise<boolean>;
    findResourceDetailForUser(employeeId: string, resourceId: string): Promise<ResourceResponseDto>;
}
