import { DomainReservationParticipantRepository } from './reservation-participant.repository';
import { BaseService } from '@libs/services/base.service';
import { ReservationParticipant } from '@libs/entities/reservation-participant.entity';
import { ParticipantsType } from '@libs/enums/reservation-type.enum';
export declare class DomainReservationParticipantService extends BaseService<ReservationParticipant> {
    private readonly reservationParticipantRepository;
    constructor(reservationParticipantRepository: DomainReservationParticipantRepository);
    findByParticipantId(participantId: string): Promise<ReservationParticipant>;
    findByReservationId(reservationId: string): Promise<ReservationParticipant[]>;
    findByEmployeeId(employeeId: string): Promise<ReservationParticipant[]>;
    findByType(type: ParticipantsType): Promise<ReservationParticipant[]>;
}
