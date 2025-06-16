import { Employee } from '@libs/entities';
import { CreateReservationSnapshotDto, UpdateReservationSnapshotDto, ReservationSnapshotResponseDto } from './dtos/reservation-snapshot.dto';
import { UpdateSnapshotUsecase } from './usecases/update-snapshot.usecase';
import { FindSnapshotUsecase } from './usecases/find-snapshot.usecase';
import { DeleteSnapshotUsecase } from './usecases/delete-snapshot.usecase';
import { UpsertSnapshotUsecase } from './usecases/upsert-snapshot.usecase';
export declare class SnapshotService {
    private readonly updateSnapshotUsecase;
    private readonly findSnapshotUsecase;
    private readonly deleteSnapshotUsecase;
    private readonly upsertSnapshotUsecase;
    constructor(updateSnapshotUsecase: UpdateSnapshotUsecase, findSnapshotUsecase: FindSnapshotUsecase, deleteSnapshotUsecase: DeleteSnapshotUsecase, upsertSnapshotUsecase: UpsertSnapshotUsecase);
    createSnapshot(user: Employee, createSnapshotDto: CreateReservationSnapshotDto): Promise<ReservationSnapshotResponseDto>;
    updateSnapshot(user: Employee, updateSnapshotDto: UpdateReservationSnapshotDto): Promise<ReservationSnapshotResponseDto>;
    findUserSnapshot(user: Employee): Promise<ReservationSnapshotResponseDto>;
    deleteSnapshot(user: Employee, snapshotId: string): Promise<void>;
}
