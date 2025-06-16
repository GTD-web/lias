import { Repository } from 'typeorm';
import { ReservationParticipant } from '@libs/entities/reservation-participant.entity';
import { BaseRepository } from '@libs/repositories/base.repository';
export declare class DomainReservationParticipantRepository extends BaseRepository<ReservationParticipant> {
    constructor(repository: Repository<ReservationParticipant>);
}
