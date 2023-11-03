import { BaseModel } from 'src/utils/base.model';
import { Gym } from './gym.entity';
export declare class Business_Hour extends BaseModel {
    day: number;
    open_time: string;
    close_time: string;
    open24Hour: boolean;
    gym: Gym;
    gymId: number;
}
