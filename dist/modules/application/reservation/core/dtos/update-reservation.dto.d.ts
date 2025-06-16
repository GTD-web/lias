import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import { Reservation } from '@libs/entities/reservation.entity';
import { ResourceLocation } from '@libs/entities/resource.entity';
export declare class UpdateReservationTitleDto {
    title?: string;
}
export declare class UpdateReservationTimeDto {
    constructor(reservation?: Reservation);
    startDate: string;
    endDate: string;
    isAllDay?: boolean;
    getPropertiesAndTypes(): {
        property: string;
        type: any;
    }[];
}
export declare class UpdateReservationStatusDto {
    status: ReservationStatus;
    rejectReason?: string;
}
export declare class UpdateReservationParticipantsDto {
    participantIds: string[];
}
export declare class UpdateReservationCcReceipientDto {
    ccReceipientIds: string[];
}
export declare class UpdateReservationDto {
    resourceId?: string;
    title?: string;
    startDate?: string;
    endDate?: string;
    isAllDay?: boolean;
    notifyBeforeStart?: boolean;
    notifyMinutesBeforeStart?: number[];
    participantIds?: string[];
}
export declare class ReturnVehicleDto {
    location: ResourceLocation;
    leftMileage: number;
    totalMileage: number;
    parkingLocationImages: string[];
    odometerImages: string[];
    indoorImages: string[];
}
