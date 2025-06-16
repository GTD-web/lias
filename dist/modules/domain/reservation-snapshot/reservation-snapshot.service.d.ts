import { DomainReservationSnapshotRepository } from './reservation-snapshot.repository';
import { BaseService } from '@libs/services/base.service';
import { ReservationSnapshot } from '@libs/entities/reservation-snapshot.entity';
export declare class DomainReservationSnapshotService extends BaseService<ReservationSnapshot> {
    private readonly reservationSnapshotRepository;
    constructor(reservationSnapshotRepository: DomainReservationSnapshotRepository);
}
