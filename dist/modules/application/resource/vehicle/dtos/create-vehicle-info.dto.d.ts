export declare class CreateVehicleInfoDto {
    vehicleNumber: string;
    leftMileage?: number;
    totalMileage?: number;
    insuranceName?: string;
    insuranceNumber?: string;
    parkingLocationImages?: string[];
    odometerImages?: string[];
    indoorImages?: string[];
}
export declare class CreateConsumableDto {
    name: string;
    replaceCycle: number;
    notifyReplacementCycle: boolean;
    vehicleInfoId: string;
    initMileage: number;
}
export declare class CreateMaintenanceDto {
    date: string;
    mileage: number;
    cost?: number;
    images?: string[];
    maintananceBy?: string;
    consumableId: string;
}
