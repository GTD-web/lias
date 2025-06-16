import { UpdateReservationSnapshotDto, ReservationSnapshotResponseDto } from '../dtos/reservation-snapshot.dto';
import { DomainReservationSnapshotService } from '@src/domain/reservation-snapshot/reservation-snapshot.service';
import { ConvertSnapshotUsecase } from './convert-snapshot.usecase';
export declare class UpdateSnapshotUsecase {
    private readonly snapshotService;
    private readonly convertSnapshotUsecase;
    constructor(snapshotService: DomainReservationSnapshotService, convertSnapshotUsecase: ConvertSnapshotUsecase);
    execute(dto: UpdateReservationSnapshotDto): Promise<ReservationSnapshotResponseDto>;
}
