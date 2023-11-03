import { Moment } from 'moment';
export declare class BaseUtils {
    static formatTimeUTC(datetime?: string | Moment): string;
    static get currentUTCTime(): string;
    static generateRandom(min?: number, max?: number): number;
    static trimWhitespaceInObject(object: any): any;
    static roundOff(num: any, places?: number): number;
    static getEnumKeys(myEnum: any): string[];
    static getEnumValues(myEnum: any): number[];
    static isValidTimeString(time: string): boolean;
    static isTimeBetween(time: string, minTime: string, maxTime: string): boolean;
    static convertTimeStringToNumber(time: string): number;
    static getNthWeekdayOfMonth(year: number, month: number, targetDay: string, n: number): Date;
    static dayOfWeekAsString(dayIndex: any): string;
}
