import { BaseModel } from 'src/utils/base.model';
import { Gym } from 'src/modules/gym/entities/gym.entity';
import { AddOnsDataModel } from '../dto/add-ons-data.dto';
import { Instructor } from 'src/modules/instructor/entities/instructor.entity';
import { SessionSchedule } from './session-schedule.entity';
import { ClassCategorySubcategory } from './class-category-subcategory.entity';
import { PricingData } from '../dto/pricing.dto';
import { AboutClass } from '../dto/class.dto';
import { Session } from './session.entity';
import { Booking } from 'src/modules/booking/entities/booking.entity';
export declare class Class extends BaseModel {
    name: string;
    spots: number;
    about: AboutClass;
    addOns: AddOnsDataModel[];
    pricing: PricingData;
    duration: number;
    difficulty: string;
    equipmentsRequired: string;
    photoThumbnail: string;
    photoCover: string;
    status: string;
    gym: Gym;
    instructor: Instructor[];
    classCategorySubcategories: ClassCategorySubcategory[];
    sessionSchedule: SessionSchedule;
    sessions: Session[];
    bookings: Booking[];
}
