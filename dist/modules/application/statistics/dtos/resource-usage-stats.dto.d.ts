import { YearMonthFilterDto } from './base.dto';
export declare class ResourceUsageStatsFilterDto extends YearMonthFilterDto {
    resourceId?: string;
    employeeId?: string;
    resourceType?: string;
}
export declare class ResourceUsageStatsResponseDto {
    resourceId: string;
    resourceName: string;
    resourceType: string;
    employeeId: string;
    employeeName: string;
    year: number;
    month: number;
    yearMonth: string;
    reservationCount: number;
    totalHours: number;
    countRank: number;
    hoursRank: number;
    computedAt: Date;
}
