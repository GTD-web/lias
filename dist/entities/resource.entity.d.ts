import { ResourceGroup } from './resource-group.entity';
import { VehicleInfo } from './vehicle-info.entity';
import { MeetingRoomInfo } from './meeting-room-info.entity';
import { AccommodationInfo } from './accommodation-info.entity';
import { Reservation } from './reservation.entity';
import { ResourceType } from '@libs/enums/resource-type.enum';
import { ResourceManager } from './resource-manager.entity';
import { EquipmentInfo } from './equipment-info.entity';
export interface ResourceLocation {
    address: string;
    detailAddress?: string;
}
export interface ResourceLocationURL {
    tmap?: string;
    navermap?: string;
    kakaomap?: string;
}
export declare class Resource {
    resourceId: string;
    resourceGroupId: string;
    name: string;
    description: string;
    location: ResourceLocation;
    locationURLs: ResourceLocationURL;
    isAvailable: boolean;
    unavailableReason: string;
    images: string[];
    notifyParticipantChange: boolean;
    notifyReservationChange: boolean;
    type: ResourceType;
    order: number;
    deletedAt: Date;
    resourceGroup: ResourceGroup;
    vehicleInfo: VehicleInfo;
    meetingRoomInfo: MeetingRoomInfo;
    accommodationInfo: AccommodationInfo;
    equipmentInfo: EquipmentInfo;
    reservations: Reservation[];
    resourceManagers: ResourceManager[];
}
