import { Resource } from './resource.entity';
import { ReservationParticipant } from './reservation-participant.entity';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
import { ReservationVehicle } from './reservation-vehicle.entity';
export declare class Reservation {
    reservationId: string;
    resourceId: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    status: ReservationStatus;
    rejectReason: string;
    isAllDay: boolean;
    notifyBeforeStart: boolean;
    notifyMinutesBeforeStart: number[];
    resource: Resource;
    participants: ReservationParticipant[];
    reservationVehicles: ReservationVehicle[];
}
