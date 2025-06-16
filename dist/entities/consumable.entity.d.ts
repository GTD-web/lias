import { VehicleInfo } from './vehicle-info.entity';
import { Maintenance } from './maintenance.entity';
export declare class Consumable {
    consumableId: string;
    vehicleInfoId: string;
    name: string;
    replaceCycle: number;
    notifyReplacementCycle: boolean;
    initMileage: number;
    deletedAt: Date;
    vehicleInfo: VehicleInfo;
    maintenances: Maintenance[];
}
