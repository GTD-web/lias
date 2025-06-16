import { ResourceType } from '@libs/enums/resource-type.enum';
import { Employee } from '@libs/entities';
import { ResourceResponseDto, ResourceGroupWithResourcesAndReservationsResponseDto } from '@src/application/resource/core/dtos/resource-response.dto';
import { ResourceAvailabilityDto } from '@src/application/resource/core/dtos/available-time-response.dto';
import { ResourceQueryDto } from '@src/application/resource/core/dtos/resource-query.dto';
import { CheckAvailabilityQueryDto, CheckAvailabilityResponseDto } from '@src/application/resource/core/dtos/check-availability.dto';
import { ResourceService } from '@src/application/resource/core/services/resource.service';
export declare class UserResourceController {
    private readonly resourceService;
    constructor(resourceService: ResourceService);
    findResourcesByTypeAndDateWithReservations(user: Employee, type: ResourceType, startDate: string, endDate: string, isMine: boolean): Promise<ResourceGroupWithResourcesAndReservationsResponseDto[]>;
    findAvailableTime(query: ResourceQueryDto): Promise<ResourceAvailabilityDto[]>;
    checkAvailability(query: CheckAvailabilityQueryDto): Promise<CheckAvailabilityResponseDto>;
    findOne(user: Employee, resourceId: string): Promise<ResourceResponseDto>;
}
