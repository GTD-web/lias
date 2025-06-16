import { ReservationSnapshotResponseDto } from '../dtos/reservation-snapshot.dto';
import { ReservationSnapshot } from '@libs/entities';
export declare class ConvertSnapshotUsecase {
    execute(snapshot: ReservationSnapshot): ReservationSnapshotResponseDto;
}
