import { LocationDto } from './location.dto';
import { ExperienceLevel } from 'src/enums/experience-level.enum';
import { UserType } from 'src/enums/user-type.enum';
import { FitnessCategoryDto } from './fitness-category.dto';
import { BaseResponseDto } from 'src/utils/base.response.dto';
import { ProfileCategoryData } from './category-data.dto';
export declare class UserDto extends BaseResponseDto {
    emailId: string;
    fullName: string;
    phoneNumber: string | any;
    location: LocationDto;
    profilePic: string;
    birthDate: Date;
    experienceLevel: ExperienceLevel;
    medicalHistory: string[];
    documentCertificate: string;
    userType: UserType;
    userCategories?: [FitnessCategoryDto];
}
export declare class UserData {
    id: number;
    emailId: string;
    ownerPhoneNumber: string;
    fullName: string;
    birthDate: string;
    experienceLevel: string;
    medicalHistory: string;
    documentCertificate: [string];
    UserType: string;
    stepName: string;
    location: [LocationDto];
    userCategories?: [FitnessCategoryDto];
}
export declare class UserDataModal extends BaseResponseDto {
    data: UserData;
}
export declare class UpdateUserNameLocationRequestDto {
    fullName: string;
    location: LocationDto;
}
export declare class UserNameLocationUpdateSuccessDto extends BaseResponseDto {
    data: UpdateUserNameLocationRequestDto;
}
export declare class UpdateUserSignupRequestDto {
    emailId: string;
    phoneNumber: string;
    userType: UserType;
}
export declare class UpdateUserSignupSuccessDto extends BaseResponseDto {
    data: UserDto;
}
export declare class UpdateUserProfileCategoryRequestDto {
    categoryData: ProfileCategoryData[];
}
export declare class UserProfileCategoryUpdateSuccessDto extends BaseResponseDto {
    data: [UpdateUserProfileCategoryRequestDto];
}
export declare class CreateEarlyUserSignupRequestDto {
    emailId: string;
    address: string;
    phoneNumber: string;
    fullName: string;
    userType: UserType;
}
export declare class MobileNumberDto {
    number: string;
}
