import { DomainReservationVehicleRepository } from './reservation-vehicle.repository';
import { BaseService } from '@libs/services/base.service';
import { ReservationVehicle } from '@libs/entities/reservation-vehicle.entity';
export declare class DomainReservationVehicleService extends BaseService<ReservationVehicle> {
    private readonly reservationVehicleRepository;
    constructor(reservationVehicleRepository: DomainReservationVehicleRepository);
    findByReservationVehicleId(reservationVehicleId: string): Promise<ReservationVehicle>;
    findByReservationId(reservationId: string): Promise<ReservationVehicle[]>;
    findByVehicleInfoId(vehicleInfoId: string): Promise<ReservationVehicle[]>;
    findByIsReturned(isReturned: boolean): Promise<ReservationVehicle[]>;
}
