import { VehicleInfoResponseDto } from '@src/application/resource/vehicle/dtos/vehicle-response.dto';
import { MeetingRoomInfoResponseDto } from '@src/application/resource/meeting-room/dtos/meeting-room-info-response.dto';
import { AccommodationInfoResponseDto } from '@src/application/resource/accommodation/dtos/accommodation-info-response.dto';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ResourceLocation, ResourceLocationURL } from './create-resource.dto';
import { ReservationResponseDto } from '@src/application/reservation/core/dtos/reservation-response.dto';
import { EmployeeResponseDto } from '@src/application/employee/dtos/employee-response.dto';
import { Resource } from '@libs/entities/resource.entity';
import { FileResponseDto } from '@src/application/file/dtos/file-response.dto';
import { EquipmentInfoResponseDto } from '@src/application/resource/equipment/dtos/equipment-info-response.dto';
export declare class CreateResourceResponseDto {
    resourceId: string;
    type: ResourceType;
    typeInfoId: string;
}
export declare class ResourceManagerResponseDto {
    resourceManagerId: string;
    resourceId: string;
    employeeId: string;
    employee: EmployeeResponseDto;
}
export declare class ResourceGroupResponseDto {
    resourceGroupId?: string;
    title: string;
    description?: string;
    type: ResourceType;
    order: number;
    parentResourceGroupId?: string;
}
export declare class ResourceResponseDto {
    constructor(resource?: Resource);
    resourceId?: string;
    resourceGroupId?: string;
    name: string;
    description?: string;
    location?: ResourceLocation;
    locationURLs?: ResourceLocationURL;
    images?: string[];
    imageFiles?: FileResponseDto[];
    type?: ResourceType;
    isAvailable?: boolean;
    unavailableReason?: string;
    notifyParticipantChange?: boolean;
    notifyReservationChange?: boolean;
    order: number;
    typeInfo?: VehicleInfoResponseDto | MeetingRoomInfoResponseDto | AccommodationInfoResponseDto | EquipmentInfoResponseDto;
    managers?: ResourceManagerResponseDto[];
    resourceGroup?: ResourceGroupResponseDto;
}
export declare class ResourceSelectResponseDto {
    resourceId?: string;
    name: string;
    images?: string[];
    isAvailable?: boolean;
    unavailableReason?: string;
    resourceGroupId?: string;
    order: number;
}
export declare class ResourceWithReservationsResponseDto extends ResourceResponseDto {
    constructor(resource?: Resource);
    reservations?: ReservationResponseDto[];
}
export declare class ChildResourceGroupResponseDto extends ResourceGroupResponseDto {
    resources?: ResourceSelectResponseDto[];
}
export declare class ResourceGroupWithResourcesResponseDto extends ResourceGroupResponseDto {
    children?: ChildResourceGroupResponseDto[];
}
export declare class ResourceGroupWithResourcesAndReservationsResponseDto extends ResourceGroupResponseDto {
    resources?: ResourceWithReservationsResponseDto[];
}
