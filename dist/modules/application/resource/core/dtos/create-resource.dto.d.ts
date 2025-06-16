import { ResourceType } from '@libs/enums/resource-type.enum';
import { CreateVehicleInfoDto } from '@src/application/resource/vehicle/dtos/create-vehicle-info.dto';
import { CreateMeetingRoomInfoDto } from '@src/application/resource/meeting-room/dtos/create-meeting-room-info.dto';
import { CreateAccommodationInfoDto } from '@src/application/resource/accommodation/dtos/create-accommodation-info.dto';
import { CreateEquipmentInfoDto } from '@src/application/resource/equipment/dtos/create-equipment-info.dto';
export declare class CreateResourceGroupDto {
    parentResourceGroupId: string;
    type: ResourceType;
    title: string;
    description?: string;
}
export declare class CreateResourceManagerDto {
    employeeId: string;
}
export declare class ResourceLocation {
    address: string;
    detailAddress?: string;
}
export declare class ResourceLocationURL {
    tmap?: string;
    navermap?: string;
    kakaomap?: string;
}
export declare class CreateResourceDto {
    resourceGroupId: string;
    name: string;
    description?: string;
    location?: ResourceLocation;
    locationURLs?: ResourceLocationURL;
    images?: string[];
    notifyParticipantChange: boolean;
    notifyReservationChange: boolean;
    type: ResourceType;
}
export declare class CreateResourceInfoDto {
    resource: CreateResourceDto;
    typeInfo: CreateVehicleInfoDto | CreateMeetingRoomInfoDto | CreateAccommodationInfoDto | CreateEquipmentInfoDto;
    managers: CreateResourceManagerDto[];
}
