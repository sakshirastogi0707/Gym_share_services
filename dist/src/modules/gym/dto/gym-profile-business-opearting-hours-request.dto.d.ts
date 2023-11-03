import { TimeSlot } from './business-hours-data.dto';
export declare class GBHRequest {
    day: number;
    timeSlots: TimeSlot[];
    open24Hour: boolean;
}
export declare class GymProfileBusinessOperatingHoursRequestDto {
    data: [GBHRequest];
}
