import { FileResponseDto } from '@resource/application/file/dtos/file-response.dto';
export declare class MaintenanceResponseDto {
    maintenanceId: string;
    consumableId: string;
    resourceName?: string;
    consumableName?: string;
    date: string;
    mileage: number;
    cost: number;
    images: string[];
    mileageFromLastMaintenance?: number;
    maintanceRequired?: boolean;
    previousMileage?: number;
    isLatest?: boolean;
    previousDate?: string;
}
export declare class ConsumableResponseDto {
    consumableId: string;
    vehicleInfoId: string;
    name: string;
    replaceCycle: number;
    notifyReplacementCycle: boolean;
    maintenances?: MaintenanceResponseDto[];
}
export declare class VehicleInfoResponseDto {
    vehicleInfoId: string;
    resourceId: string;
    insuranceName: string;
    insuranceNumber: string;
    totalMileage: number;
    leftMileage: number;
    parkingLocationImages: string[];
    odometerImages: string[];
    indoorImages: string[];
    parkingLocationFiles?: FileResponseDto[];
    odometerFiles?: FileResponseDto[];
    indoorFiles?: FileResponseDto[];
    consumables?: ConsumableResponseDto[];
}
