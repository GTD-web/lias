import { ResourceType } from '@libs/enums/resource-type.enum';
import { PaginationQueryDto } from '@libs/dtos/paginate-query.dto';
export declare class ResourceQueryDto extends PaginationQueryDto {
    resourceType: ResourceType;
    resourceGroupId: string;
    reservationId?: string;
    startDate?: string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
    am?: boolean;
    pm?: boolean;
    timeUnit?: number;
}
