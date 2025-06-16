import { DateRangeFilterDto } from './base.dto';
export declare class VehicleMaintenanceHistoryFilterDto extends DateRangeFilterDto {
    resourceId?: string;
    vehicleInfoId?: string;
    consumableId?: string;
    responsibleEmployeeId?: string;
}
export declare class VehicleMaintenanceHistoryResponseDto {
    resourceId: string;
    resourceName: string;
    vehicleInfoId: string;
    vehicleNumber: string;
    consumableId: string;
    consumableName: string;
    replaceCycle: number;
    notifyReplacementCycle: boolean;
    maintenanceId: string;
    maintenanceDate: string;
    mileage: number;
    cost: number;
    maintananceBy: string;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
    responsibleEmployeeId: string;
    responsibleEmployeeName: string;
    department: string;
    position: string;
    year: number;
    month: number;
    dateStr: string;
}
