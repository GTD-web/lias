import { YearMonthFilterDto } from './base.dto';
export declare class EmployeeReservationStatsFilterDto extends YearMonthFilterDto {
    employeeId?: string;
    employeeName?: string;
}
export declare class EmployeeReservationStatsResponseDto {
    year: number;
    month: number;
    yearMonth: string;
    employeeId: string;
    employeeName: string;
    reservationCount: number;
    totalHours: number;
    avgHoursPerReservation: number;
    vehicleCount: number;
    meetingRoomCount: number;
    accommodationCount: number;
    cancellationCount: number;
    computedAt: Date;
}
