export declare class TimeSlotDto {
    startTime: string;
    endTime: string;
}
export declare class ResourceAvailabilityDto {
    resourceId: string;
    resourceName: string;
    resourceLocation?: string;
    availableTimeSlots?: TimeSlotDto[];
}
