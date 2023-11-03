import { BaseModel } from 'src/utils/base.model';
import { Gym } from './gym.entity';
export declare class Amenity extends BaseModel {
    orderId: number;
    name: string;
    isActive: boolean;
    gyms: Gym[];
    image: string;
}
