import { Employee } from '@libs/entities';
import { SnapshotService } from '../snapshot.service';
import { CreateReservationSnapshotDto, ReservationSnapshotResponseDto, UpdateReservationSnapshotDto } from '../dtos/reservation-snapshot.dto';
export declare class UserReservationSnapshotController {
    private readonly snapshotService;
    constructor(snapshotService: SnapshotService);
    createSnapshot(user: Employee, createSnapshotDto: CreateReservationSnapshotDto): Promise<ReservationSnapshotResponseDto>;
    updateSnapshot(user: Employee, updateSnapshotDto: UpdateReservationSnapshotDto): Promise<ReservationSnapshotResponseDto>;
    findUserSnapshot(user: Employee): Promise<ReservationSnapshotResponseDto>;
    deleteSnapshot(user: Employee, snapshotId: string): Promise<void>;
}
