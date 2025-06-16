export declare class AttendeeDto {
    id?: string;
    name?: string;
    department?: string;
}
export declare class DroppableGroupItemDto {
    id?: string;
    title?: string;
    order?: number;
}
export declare class DroppableGroupDataDto {
    id?: string;
    title?: string;
    items?: DroppableGroupItemDto[];
}
export declare class DateRangeDto {
    from?: string;
    to?: string;
}
export declare class TimeInfoDto {
    hour?: number;
    minute?: number;
}
export declare class TimeRangeDto {
    am?: boolean;
    pm?: boolean;
}
export declare class SelectedResourceDto {
    resourceId?: string;
    resourceName?: string;
    startDate?: string;
    endDate?: string;
}
export declare class ReminderTimeDto {
    id?: string;
    time?: number;
    isSelected?: boolean;
}
export declare class CreateReservationSnapshotDto {
    step?: 'groups' | 'date-time' | 'resources' | 'info';
    resourceType?: string;
    droppableGroupData?: DroppableGroupDataDto;
    dateRange?: DateRangeDto;
    startTime?: TimeInfoDto;
    endTime?: TimeInfoDto;
    timeRange?: TimeRangeDto;
    timeUnit?: number;
    selectedResource?: SelectedResourceDto;
    title?: string;
    reminderTimes?: ReminderTimeDto[];
    isAllDay?: boolean;
    notifyBeforeStart?: boolean;
    notifyMinutesBeforeStart?: number[];
    attendees?: AttendeeDto[];
}
export declare class UpdateReservationSnapshotDto extends CreateReservationSnapshotDto {
    snapshotId: string;
}
export declare class DateRangeResponseDto {
    from?: Date;
    to?: Date;
}
export declare class TimeInfoResponseDto {
    hour?: number;
    minute?: number;
}
export declare class TimeRangeResponseDto {
    am?: boolean;
    pm?: boolean;
}
export declare class SelectedResourceResponseDto {
    resourceId?: string;
    resourceName?: string;
    startDate?: Date;
    endDate?: Date;
}
export declare class ReservationSnapshotResponseDto {
    snapshotId: string;
    employeeId: string;
    step?: 'groups' | 'date-time' | 'resources' | 'info';
    resourceType?: string;
    droppableGroupData?: DroppableGroupDataDto;
    dateRange?: DateRangeResponseDto;
    startTime?: TimeInfoResponseDto;
    endTime?: TimeInfoResponseDto;
    timeRange?: TimeRangeResponseDto;
    timeUnit?: number;
    selectedResource?: SelectedResourceResponseDto;
    title?: string;
    reminderTimes?: ReminderTimeDto[];
    isAllDay: boolean;
    notifyBeforeStart: boolean;
    notifyMinutesBeforeStart?: number[];
    attendees?: AttendeeDto[];
    createdAt: Date;
    updatedAt: Date;
}
