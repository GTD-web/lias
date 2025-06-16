import { CreateResourceManagerDto, ResourceLocation, ResourceLocationURL } from './create-resource.dto';
export declare class UpdateResourceGroupDto {
    title?: string;
}
export declare class UpdateResourceDto {
    resourceGroupId?: string;
    name?: string;
    description?: string;
    location?: ResourceLocation;
    locationURLs?: ResourceLocationURL;
    images?: string[];
    isAvailable?: boolean;
    unavailableReason?: string;
    notifyParticipantChange?: boolean;
    notifyReservationChange?: boolean;
}
export declare class UpdateResourceInfoDto {
    resource?: UpdateResourceDto;
    managers?: CreateResourceManagerDto[];
}
export declare class NewOrderResourceDto {
    resourceId: string;
    newOrder: number;
}
export declare class UpdateResourceOrdersDto {
    orders: NewOrderResourceDto[];
}
export declare class NewOrderResourceGroupDto {
    resourceGroupId: string;
    newOrder: number;
}
export declare class UpdateResourceGroupOrdersDto {
    orders: NewOrderResourceGroupDto[];
}
