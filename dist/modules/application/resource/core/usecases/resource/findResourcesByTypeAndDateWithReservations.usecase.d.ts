import { DomainResourceService } from '@src/domain/resource/resource.service';
import { DomainResourceGroupService } from '@src/domain/resource-group/resource-group.service';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { Employee } from '@libs/entities';
import { ResourceGroupWithResourcesResponseDto } from '@src/application/resource/core/dtos/resource-response.dto';
import { DomainReservationService } from '@src/domain/reservation/reservation.service';
export declare class FindResourcesByTypeAndDateWithReservationsUsecase {
    private readonly resourceService;
    private readonly resourceGroupService;
    private readonly reservationService;
    constructor(resourceService: DomainResourceService, resourceGroupService: DomainResourceGroupService, reservationService: DomainReservationService);
    execute(user: Employee, type: ResourceType, startDate: string, endDate: string, isMine?: boolean): Promise<ResourceGroupWithResourcesResponseDto[]>;
}
