import { BaseResponseDto } from 'src/utils/base.response.dto';
import { TimeSlot } from './business-hours-data.dto';
import { InstructorDataDto } from './instructor-data.dto';
import { AmenitiyDataModal } from './amenities-data.dto';
import { GymCategoryDataDto } from './gym-category-data.dto';
import { BasicGymDataDto } from './basic-gym-data.dto';
import { GBHRequest } from './gym-profile-business-opearting-hours-request.dto';
declare class GymData extends BasicGymDataDto {
    id: number;
    ownerEmail: string;
    ownerPhoneNumber: string;
    ownerName: string;
    birthDate: string;
    businessName: string;
    businessEmail: string;
    businessAddress: string;
    businessContact: string;
    communicationAddress: string;
    photos: string;
    category: number;
    stepName: string;
    waiver: string;
    waiverName: string;
    stripeAccountId: string;
    googleBusinessProfile: string;
    registrationMode: string;
    about: string;
    instructors: [InstructorDataDto];
    businessHours?: [TimeSlot];
    gymCategories?: [GymCategoryDataDto];
    amenities?: [AmenitiyDataModal];
}
export declare class GymDataModal extends BaseResponseDto {
    data: GymData;
}
export declare class GymUpdateRequestDto {
    businessName: string;
    about: string;
    category: string;
    amenities: number[];
    businessHours: GBHRequest[];
    photos: string;
    coverPhoto: string;
    waiver: string;
    waiverName: string;
}
export {};
