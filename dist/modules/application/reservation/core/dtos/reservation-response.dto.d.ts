import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import { Reservation } from '@libs/entities';
import { EmployeeResponseDto, ResourceResponseDto } from '@resource/dtos.index';
export declare class ReservationResponseDto {
    constructor(reservation?: Reservation);
    reservationId: string;
    resourceId?: string;
    title?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    rejectReason?: string;
    status?: ReservationStatus;
    isAllDay?: boolean;
    notifyBeforeStart?: boolean;
    notifyMinutesBeforeStart?: number[];
    isMine?: boolean;
}
export declare class ReservationParticipantResponseDto {
    participantId: string;
    employeeId: string;
    type: string;
    employee?: EmployeeResponseDto;
}
export declare class ReservationVehicleResponseDto {
    reservationVehicleId: string;
    vehicleInfoId: string;
    startOdometer: number;
    endOdometer: number;
    startFuelLevel: number;
    endFuelLevel: number;
    isReturned: boolean;
    returnedAt: Date;
}
export declare class ReservationWithResourceResponseDto extends ReservationResponseDto {
    constructor(reservation?: Reservation);
    resource?: ResourceResponseDto;
}
export declare class ReservationWithRelationsResponseDto extends ReservationResponseDto {
    constructor(reservation?: Reservation);
    resource?: ResourceResponseDto;
    reservers?: ReservationParticipantResponseDto[];
    participants?: ReservationParticipantResponseDto[];
    reservationVehicles?: ReservationVehicleResponseDto[];
    isMine?: boolean;
    returnable?: boolean;
    modifiable?: boolean;
    hasUnreadNotification?: boolean;
}
export declare class CreateReservationResponseDto {
    reservationId: string;
}
export declare class GroupedReservationResponseDto {
    date: string;
    reservations: ReservationWithRelationsResponseDto[];
}
export declare class GroupedReservationWithResourceResponseDto {
    resource: ResourceResponseDto;
    groupedReservations?: GroupedReservationResponseDto[];
}
export declare class CalendarResponseDto {
    reservations: ReservationWithRelationsResponseDto[];
}
