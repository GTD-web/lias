import { Repository } from 'typeorm';
import { ReservationSnapshot } from '@libs/entities/reservation-snapshot.entity';
import { BaseRepository } from '@libs/repositories/base.repository';
export declare class DomainReservationSnapshotRepository extends BaseRepository<ReservationSnapshot> {
    constructor(repository: Repository<ReservationSnapshot>);
}
