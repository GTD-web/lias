import * as dayjs from 'dayjs';
declare class DateUtilWrapper {
    private date;
    constructor(date: dayjs.Dayjs);
    toDate(): Date;
    format(format?: string): string;
    addDays(days: number): DateUtilWrapper;
    addMinutes(minutes: number): DateUtilWrapper;
    toISOString(): string;
    toMinutes(): number;
    hour(hours: number): DateUtilWrapper;
    minute(minutes: number): DateUtilWrapper;
    second(seconds: number): DateUtilWrapper;
    getYear(): number;
    getMonth(): number;
    getDate(): number;
    getDaysInMonth(): number;
    getFirstDayOfMonth(): DateUtilWrapper;
    getLastDayOfMonth(): DateUtilWrapper;
}
export declare class DateUtil {
    static now(): DateUtilWrapper;
    static date(date: Date | string | number): DateUtilWrapper;
    static format(date: Date | string | number, format?: string): string;
    static parse(dateString: string): DateUtilWrapper;
    static addDays(date: Date | string | number, days: number): DateUtilWrapper;
    static addMinutes(date: Date | string | number, minutes: number): DateUtilWrapper;
    static toISOString(date: Date | string | number): string;
    static toMinutes(date: Date | string | number): number;
    static fromMinutes(minutes: number): DateUtilWrapper;
    static getYear(date?: Date | string | number): number;
    static getMonth(date?: Date | string | number): number;
    static getDate(date?: Date | string | number): number;
    static getDaysInMonth(date?: Date | string | number): number;
    static getFirstDayOfMonth(date?: Date | string | number): DateUtilWrapper;
    static getLastDayOfMonth(date?: Date | string | number): DateUtilWrapper;
    static toAlarmRangeString(startDate: string, endDate: string): string;
    static replaceWeekday(str: string): string;
}
export {};
