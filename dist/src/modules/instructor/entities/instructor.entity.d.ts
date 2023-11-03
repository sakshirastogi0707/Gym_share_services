import { BaseModel } from 'src/utils/base.model';
import { InstructorTrainedFor } from './trained_for.entity';
import { Certificate } from './certificate.entity';
import { Gym } from 'src/modules/gym/entities/gym.entity';
import { Class } from 'src/modules/class/entities/class.entity';
export declare class Instructor extends BaseModel {
    name: string;
    photo: string;
    dob: Date;
    about: string;
    expYears: number;
    expMonths: number;
    gym: Gym;
    trainedFor: InstructorTrainedFor[];
    certificates: Certificate[];
    classes: Class[];
    active: boolean;
}
