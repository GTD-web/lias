import { Employee } from '@libs/entities';
import { FindSnapshotUsecase } from './find-snapshot.usecase';
import { CreateSnapshotUsecase } from './create-snapshot.usecase';
import { UpdateSnapshotUsecase } from './update-snapshot.usecase';
import { CreateReservationSnapshotDto, ReservationSnapshotResponseDto } from '../dtos/reservation-snapshot.dto';
export declare class UpsertSnapshotUsecase {
    private readonly findSnapshotUsecase;
    private readonly createSnapshotUsecase;
    private readonly updateSnapshotUsecase;
    constructor(findSnapshotUsecase: FindSnapshotUsecase, createSnapshotUsecase: CreateSnapshotUsecase, updateSnapshotUsecase: UpdateSnapshotUsecase);
    execute(user: Employee, dto: CreateReservationSnapshotDto): Promise<ReservationSnapshotResponseDto>;
}
