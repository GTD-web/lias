import { Resource } from './resource.entity';
import { Consumable } from './consumable.entity';
export declare class VehicleInfo {
    vehicleInfoId: string;
    resourceId: string;
    vehicleNumber: string;
    leftMileage: number;
    totalMileage: number;
    insuranceName: string;
    insuranceNumber: string;
    parkingLocationImages: string[];
    odometerImages: string[];
    indoorImages: string[];
    resource: Resource;
    consumables: Consumable[];
}
