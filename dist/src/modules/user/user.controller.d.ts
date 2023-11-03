import { UserService } from './user.service';
import { CreateEarlyUserSignupRequestDto, MobileNumberDto, UpdateUserNameLocationRequestDto, UpdateUserProfileCategoryRequestDto, UpdateUserSignupRequestDto } from './dto/user.dto';
import { Request } from 'express';
import { UpdateUserProfileBasicRequestDto } from './dto/update-user-profile-basic-request.dto';
import { UpdateUserProfilePicRequestDto } from './dto/update-user-profile-pic-request.dto';
import { UpdateUserProfileFitnessLevelRequestDto } from './dto/update-user-profile-fitness-level-request.dto';
import { UpdateUserProfileMedicalHistoryRequestDto } from './dto/update-user-profile-medical-history-request.dto';
import { UpdateUserProfileDocumentRequestDto } from './dto/update-user-profile-document-request.dto';
import { GymService } from '../gym/gym.service';
import { AccountSettings } from '../shared/dtos/account-settings.dto';
import { AccountSettingsService } from '../shared/account-settings.service';
export declare class UserController {
    private readonly userService;
    private readonly gymService;
    private readonly accountService;
    constructor(userService: UserService, gymService: GymService, accountService: AccountSettingsService);
    signUp(user: UpdateUserSignupRequestDto, req: any): Promise<{
        success: boolean;
        message: string;
        data: {
            userType: string;
            userStatus: string;
            userCategorySubcategories: import("./entity/user.category.subcategory.entity").UserCategorySubCategory[];
            gyms: import("../gym/entities/gym.entity").Gym[];
            uuid: string;
            fullName: string;
            emailId: string;
            phoneNumber: string;
            location: import("../../interfaces/user-location.interface").ILocation;
            profilePic: string;
            birthDate: Date;
            firebaseUuid: string;
            documentCertificate: [string];
            experienceLevel: string;
            stepName: string;
            medicalHistory: string[];
            isActive: boolean;
            source: string;
            deletedAt: Date;
            address: string;
            favourites: import("../class/entities/favourites.entity").Favourites[];
            paymentMethod: import("../payments/entity/payments.entity").Payment[];
            bookings: import("../booking/entities/booking.entity").Booking[];
            id: bigint;
            createdAt: Date;
            modifiedAt: Date;
        };
    }>;
    signUpEarlyUser(user: CreateEarlyUserSignupRequestDto, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    userProfile(req: Request): Promise<any>;
    deleteUser(req: Request): Promise<any>;
    updateUserOnboardingProfileBasic(userModelData: UpdateUserProfileBasicRequestDto, req: Request): Promise<any>;
    updateUserOnboardingProfilePic(userModelData: UpdateUserProfilePicRequestDto, req: Request): Promise<any>;
    updateUserOnboardingProfileFitnessLevel(userModelData: UpdateUserProfileFitnessLevelRequestDto, req: Request): Promise<{
        status: boolean;
        message: string;
        stepName: string;
        data: {
            experienceLevel: string;
        };
    }>;
    updateUserOnboardingProfileMedicalHistory(userModelData: UpdateUserProfileMedicalHistoryRequestDto, req: Request): Promise<{
        status: boolean;
        message: string;
        stepName: string;
        data: {
            medicalHistory: string[];
        };
    }>;
    updateUserOnboardingProfileCategory(userModelData: UpdateUserProfileCategoryRequestDto, req: Request): Promise<any>;
    updateUserOnboardingProfileDocument(userModelData: UpdateUserProfileDocumentRequestDto, req: Request): Promise<any>;
    updateUserNameLocation(payload: UpdateUserNameLocationRequestDto, req: Request): Promise<{
        status: boolean;
        message: string;
        data: UpdateUserNameLocationRequestDto;
    }>;
    updateAccountSettings(payload: AccountSettings, req: Request): Promise<{
        status: number;
        message: string;
    }>;
    getAccountSettings(req: Request): Promise<{
        status: number;
        message: string;
        data: import("../shared/entities/account-settings.entity").AccountSettings;
    }>;
    checkDuplicateNumber(body: MobileNumberDto): Promise<{
        status: number;
        message: string;
    }>;
}
