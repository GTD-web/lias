import { ResourceType } from '@libs/enums/resource-type.enum';
import { ReservationStatus } from '@libs/enums/reservation-type.enum';
export declare class CreateReservationDto {
    resourceId: string;
    resourceType: ResourceType;
    title: string;
    description?: string;
    startDate: string;
    endDate: string;
    isAllDay: boolean;
    notifyBeforeStart: boolean;
    status?: ReservationStatus;
    notifyMinutesBeforeStart?: number[];
    participantIds: string[];
}
