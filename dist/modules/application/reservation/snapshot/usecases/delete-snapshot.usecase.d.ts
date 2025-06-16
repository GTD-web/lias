import { DomainReservationSnapshotService } from '@src/domain/reservation-snapshot/reservation-snapshot.service';
export declare class DeleteSnapshotUsecase {
    private readonly snapshotService;
    constructor(snapshotService: DomainReservationSnapshotService);
    execute(snapshotId: string): Promise<void>;
}
