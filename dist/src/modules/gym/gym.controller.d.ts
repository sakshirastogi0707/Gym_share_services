import { Request } from 'express';
import { GymService } from './gym.service';
import { GymProfileOwnerRequestDto } from './dto/gym-profile-owner-request.dto';
import { GymProfileBusinessRequestDto } from './dto/gym-profile-business-request.dto';
import { GymProfileBusinessAddressRequestDto } from './dto/gym-profile-business-address-request.dto';
import { GymProfileCommunicationAddressRequestDto } from './dto/gym-profile-communication-address-request.dto';
import { GymProfileAboutBusinessRequestDto } from './dto/gym-profile-about-business-request.dto';
import { GymProfilePhotosRequestDto } from './dto/gym-profile-photos-request.dto';
import { GymProfileWaiverRequestDto } from './dto/gym-profile-waiver-request.dto';
import { GymProfileBusinessOperatingHoursRequestDto } from './dto/gym-profile-business-opearting-hours-request.dto';
import { GymProfileAmenityRequestDto } from './dto/gym-profile-amenity-request.dto';
import { GymUpdateRequestDto } from './dto/gym-data.dto';
import { GymProfileFinancialCreditCardRequestDto } from './dto/gym-profile-financial-credit-card-details-request.dto';
import { GymProfileFinancialAchDetailsRequestDto } from './dto/gym-profile-financial-ach-details-request.dto';
import { GymProfileCategoryRequestDto } from './dto/gym-profile-category-request.dto';
export declare class GymController {
    private readonly gymService;
    constructor(gymService: GymService);
    getGymDetailsbyId(req: Request, gymId: number): Promise<{
        status: boolean;
        message: string;
        data: import("./entities/gym.entity").Gym;
    }>;
    getGymDetailsbyIdForUser(req: Request, gymId: number): Promise<{
        status: boolean;
        message: string;
        data: import("./entities/gym.entity").Gym[];
    }>;
    getBasicGymDetailsbyId(req: Request, gymId: number): Promise<{
        status: boolean;
        message: string;
        data: import("./entities/gym.entity").Gym;
    }>;
    saveGymOnboardingOwnerProfileBasic(gymModelData: GymProfileOwnerRequestDto, req: Request, gymId: number): Promise<{
        status: boolean;
        message: string;
        stepName: string;
        data: {
            ownerEmail: string;
            ownerName: string;
            ownerPhoneNumber: string;
            birthDate: Date;
            status: string;
        };
    }>;
    saveGymOnboardingBusinessProfileBasic(gymModelData: GymProfileBusinessRequestDto, req: Request, gymId: number): Promise<{
        status: boolean;
        message: string;
        stepName: string;
        data: {
            businessName: string;
            businessEmail: string;
            businessContact: string;
            category: any;
        };
    }>;
    saveGymOnboardingBusinessAddressProfile(gymModelData: GymProfileBusinessAddressRequestDto, req: Request, gymId: number): Promise<{
        status: boolean;
        message: string;
        stepName: string;
        data: {
            businessAddress: string;
            placeId: string;
        };
    }>;
    saveGymOnboardingCommunicationAddressProfile(gymModelData: GymProfileCommunicationAddressRequestDto, req: Request, gymId: number): Promise<any>;
    saveGymOnboardingAboutAddressProfile(gymModelData: GymProfileAboutBusinessRequestDto, req: Request, gymId: number): Promise<{
        status: boolean;
        message: string;
        stepName: string;
        data: {
            description: string;
        };
    }>;
    saveGymOnboardingBusinessHoursProfile(gymModelData: GymProfileBusinessOperatingHoursRequestDto, req: Request, gymId: number): Promise<{
        status: boolean;
        message: string;
        stepName: import("../../enums/gym-step-name.enum").GymStepName;
        data: [import("./dto/gym-profile-business-opearting-hours-request.dto").GBHRequest];
    }>;
    saveGymOnboardingBusinessPhotosProfile(gymModelData: GymProfilePhotosRequestDto, req: Request, gymId: number): Promise<{
        status: boolean;
        message: string;
        stepName: string;
        data: {
            photos: string;
        };
    }>;
    saveGymOnboardingUserWaiverProfile(gymModelData: GymProfileWaiverRequestDto, req: Request, gymId: number): Promise<{
        status: boolean;
        message: string;
        stepName: string;
        data: {
            waiver: string;
        };
    }>;
    updateUserOnboardingProfileCategory(req: Request, userModelData: GymProfileCategoryRequestDto, gymId: number): Promise<any>;
    updateGymOnboardingUserAmenityProfile(gymModelData: GymProfileAmenityRequestDto, req: Request, gymId: number): Promise<{
        status: boolean;
        message: string;
        stepName: import("../../enums/gym-step-name.enum").GymStepName;
        data: GymProfileAmenityRequestDto;
    }>;
    getGymInstructors(req: Request, gymId: number): Promise<any>;
    approveGym(gymId: number): Promise<{
        status: boolean;
        message: string;
    }>;
    declineGym(gymId: number): Promise<{
        status: boolean;
        message: string;
    }>;
    suspendGym(gymId: number): Promise<{
        status: boolean;
        message: string;
    }>;
    updateGymProfile(gymId: number, payload: GymUpdateRequestDto): Promise<{
        status: boolean;
        code: number;
        message: string;
    }>;
    financialCreditCardDetailsGym(req: Request, gymId: number, financialDetails: GymProfileFinancialCreditCardRequestDto): Promise<{
        message: string;
        status?: undefined;
    } | {
        status: boolean;
        message: string;
    }>;
    financialAchDetailsGym(req: Request, gymId: number, financialDetails: GymProfileFinancialAchDetailsRequestDto): Promise<{
        message: string;
        status?: undefined;
    } | {
        status: boolean;
        message: string;
    }>;
    getReviews(gymId: string): Promise<{
        status: boolean;
        message: string;
        data: {
            rating: any;
            reviews: any;
        };
    }>;
    getconnecturl(gymId: number): Promise<{
        status: number;
        message: string;
        data: {
            stripeAccountId: string;
            object: "account_link";
            created: number;
            expires_at: number;
            url: string;
            lastResponse: {
                headers: {
                    [key: string]: string;
                };
                requestId: string;
                statusCode: number;
                apiVersion?: string;
                idempotencyKey?: string;
                stripeAccount?: string;
            };
        };
    }>;
}
