import { Reservation } from './reservation.entity';
import { VehicleInfo } from './vehicle-info.entity';
export declare class ReservationVehicle {
    reservationVehicleId: string;
    reservationId: string;
    vehicleInfoId: string;
    startOdometer: number;
    endOdometer: number;
    startFuelLevel: number;
    endFuelLevel: number;
    isReturned: boolean;
    returnedAt: Date;
    reservation: Reservation;
    vehicleInfo: VehicleInfo;
}
