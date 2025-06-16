import { Employee } from './employee.entity';
export declare class ReservationSnapshot {
    snapshotId: string;
    employeeId: string;
    step: 'groups' | 'date-time' | 'resources' | 'info';
    resourceType: string;
    droppableGroupData: {
        id?: string;
        title?: string;
        items?: {
            id?: string;
            title?: string;
            order?: number;
        }[];
    };
    dateRange: {
        from?: Date;
        to?: Date;
    };
    startTime: {
        hour?: number;
        minute?: number;
    };
    endTime: {
        hour?: number;
        minute?: number;
    };
    timeRange: {
        am?: boolean;
        pm?: boolean;
    };
    timeUnit: number;
    selectedResource: {
        resourceId?: string;
        resourceName?: string;
        startDate?: Date;
        endDate?: Date;
    };
    title: string;
    reminderTimes: {
        id?: string;
        time?: number;
        isSelected?: boolean;
    }[];
    isAllDay: boolean;
    notifyBeforeStart: boolean;
    notifyMinutesBeforeStart: number[];
    attendees: {
        id?: string;
        name?: string;
        department?: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
    employee?: Employee;
}
