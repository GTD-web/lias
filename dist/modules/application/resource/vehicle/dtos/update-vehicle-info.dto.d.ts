export declare class UpdateMaintenanceDto {
    date?: string;
    mileage?: number;
    cost?: number;
    images?: string[];
    consumableId?: string;
}
export declare class UpdateConsumableDto {
    name: string;
    replaceCycle: number;
    notifyReplacementCycle?: boolean;
    vehicleInfoId: string;
}
export declare class UpdateVehicleInfoDto {
    vehicleNumber?: string;
    insuranceName?: string;
    insuranceNumber?: string;
    totalMileage?: number;
    leftMileage?: number;
    parkingLocationImages?: string[];
    odometerImages?: string[];
    indoorImages?: string[];
}
