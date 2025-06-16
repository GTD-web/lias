import { Repository } from 'typeorm';
import { ReservationVehicle } from '@libs/entities/reservation-vehicle.entity';
import { BaseRepository } from '@libs/repositories/base.repository';
export declare class DomainReservationVehicleRepository extends BaseRepository<ReservationVehicle> {
    constructor(repository: Repository<ReservationVehicle>);
}
