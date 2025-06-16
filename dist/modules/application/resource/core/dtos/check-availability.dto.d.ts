export declare class CheckAvailabilityQueryDto {
    resourceId: string;
    startDate: string;
    endDate: string;
    reservationId?: string;
}
export declare class CheckAvailabilityResponseDto {
    isAvailable: boolean;
}
