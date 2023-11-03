import { BaseModel } from 'src/utils/base.model';
import { Class } from './class.entity';
export declare class SessionSchedule extends BaseModel {
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
    occurences: number;
    repeat: string;
    customDetails: any;
    class: Class;
}
