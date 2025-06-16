import { Reservation } from './reservation.entity';
import { Employee } from './employee.entity';
import { ParticipantsType } from '@libs/enums/reservation-type.enum';
export declare class ReservationParticipant {
    participantId: string;
    reservationId: string;
    employeeId: string;
    type: ParticipantsType;
    reservation: Reservation;
    employee: Employee;
}
