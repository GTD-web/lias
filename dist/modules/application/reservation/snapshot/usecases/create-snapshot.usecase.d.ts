import { Employee } from '@libs/entities';
import { CreateReservationSnapshotDto, ReservationSnapshotResponseDto } from '../dtos/reservation-snapshot.dto';
import { DomainReservationSnapshotService } from '@src/domain/reservation-snapshot/reservation-snapshot.service';
import { ConvertSnapshotUsecase } from './convert-snapshot.usecase';
export declare class CreateSnapshotUsecase {
    private readonly snapshotService;
    private readonly convertSnapshotUsecase;
    constructor(snapshotService: DomainReservationSnapshotService, convertSnapshotUsecase: ConvertSnapshotUsecase);
    execute(user: Employee, dto: CreateReservationSnapshotDto): Promise<ReservationSnapshotResponseDto>;
}
