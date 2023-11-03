import { BaseModel } from 'src/utils/base.model';
import { ILocation } from 'src/interfaces/user-location.interface';
import { UserCategorySubCategory } from './user.category.subcategory.entity';
import { Gym } from 'src/modules/gym/entities/gym.entity';
import { Favourites } from '../../class/entities/favourites.entity';
import { Payment } from 'src/modules/payments/entity/payments.entity';
import { Booking } from 'src/modules/booking/entities/booking.entity';
export declare class User extends BaseModel {
    userCategorySubcategories: UserCategorySubCategory[];
    gyms: Gym[];
    uuid: string;
    fullName: string;
    emailId: string;
    phoneNumber: string;
    location: ILocation;
    profilePic: string;
    birthDate: Date;
    firebaseUuid: string;
    documentCertificate: [string];
    experienceLevel: string;
    stepName: string;
    userType: number;
    medicalHistory: string[];
    isActive: boolean;
    userStatus: number;
    source: string;
    deletedAt: Date;
    address: string;
    favourites: Favourites[];
    paymentMethod: Payment[];
    bookings: Booking[];
}