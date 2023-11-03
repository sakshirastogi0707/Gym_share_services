import { BaseModel } from 'src/utils/base.model';
import { Class } from './class.entity';
export declare class Session extends BaseModel {
    onDate: Date;
    startTime: string;
    endTime: string;
    totalSeats: number;
    seatsFilled: number;
    isActive: boolean;
    class: Class;
}
