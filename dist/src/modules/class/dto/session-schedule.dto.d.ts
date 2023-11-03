import { CustomDetailsDto } from './custom-details.dto';
export declare class SessionScheduleDto {
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
    occurences: number;
    repeat: string;
    customDetails: CustomDetailsDto;
}
export declare class UpdateSessionScheduleDto extends SessionScheduleDto {
}
