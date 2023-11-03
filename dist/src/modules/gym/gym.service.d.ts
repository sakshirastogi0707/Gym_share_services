import { Repository } from 'typeorm/repository/Repository';
import { GymProfileOwnerRequestDto } from './dto/gym-profile-owner-request.dto';
import { Gym } from './entities/gym.entity';
import { GymStepName } from 'src/enums/gym-step-name.enum';
import { GymProfileBusinessRequestDto } from './dto/gym-profile-business-request.dto';
import { GymProfileBusinessAddressRequestDto } from './dto/gym-profile-business-address-request.dto';
import { GymProfileCommunicationAddressRequestDto } from './dto/gym-profile-communication-address-request.dto';
import { GymProfileAboutBusinessRequestDto } from './dto/gym-profile-about-business-request.dto';
import { GymProfilePhotosRequestDto } from './dto/gym-profile-photos-request.dto';
import { GymProfileWaiverRequestDto } from './dto/gym-profile-waiver-request.dto';
import { GymProfileCategoryRequestDto } from './dto/gym-profile-category-request.dto';
import { GBHRequest, GymProfileBusinessOperatingHoursRequestDto } from './dto/gym-profile-business-opearting-hours-request.dto';
import { Business_Hour } from './entities/business_hour.entity';
import { GymCategorySubCategory } from './entities/gym.category.subcategory.entity';
import { Instructor } from '../instructor/entities/instructor.entity';
import { Amenity } from './entities/amenity.entity';
import { GymProfileAmenityRequestDto } from './dto/gym-profile-amenity-request.dto';
import { GymStatus } from 'src/enums/gym-type-status.enum';
import { GymUpdateRequestDto } from './dto/gym-data.dto';
import { PaymentMode } from 'src/enums/gym-financial.enum';
import { FinancialDetails } from './dto/financial-details.interface';
import { Class } from '../class/entities/class.entity';
import { InstructorTrainedFor } from '../instructor/entities/trained_for.entity';
import { StripeService } from '../payments/stripe.service';
export declare class GymService {
    private gymCategorySubCategoryRepository;
    private gymRepository;
    private businessHoursRepository;
    private amenityRepository;
    private instructorRepository;
    private classRepository;
    private trainedForRepository;
    private stripeService;
    constructor(gymCategorySubCategoryRepository: Repository<GymCategorySubCategory>, gymRepository: Repository<Gym>, businessHoursRepository: Repository<Business_Hour>, amenityRepository: Repository<Amenity>, instructorRepository: Repository<Instructor>, classRepository: Repository<Class>, trainedForRepository: Repository<InstructorTrainedFor>, stripeService: StripeService);
    getGymProfile(user: any): Promise<any>;
    gymExists: (id: number) => Promise<Gym>;
    getGymById(gymId: number): Promise<Gym>;
    getGymByIdForUser(gymId: number): Promise<Gym[]>;
    getBasicGymDetailsById(gymId: number): Promise<Gym>;
    updateGymOwnerProfileBasic(gymId: number, userOwnerData: GymProfileOwnerRequestDto, userId: number): Promise<{
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
    updateGymBusinessProfileBasic(gymId: number, userBusinessData: GymProfileBusinessRequestDto, userId: number): Promise<{
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
    updateGymBusinessAddressProfile(gymId: number, userBusinessData: GymProfileBusinessAddressRequestDto, userId: number): Promise<{
        status: boolean;
        message: string;
        stepName: string;
        data: {
            businessAddress: string;
            placeId: string;
        };
    }>;
    updateGymCommunicationAddressProfile(gymId: number, userBusinessData: GymProfileCommunicationAddressRequestDto, userId: number): Promise<any>;
    updateGymAboutAddressProfile(gymId: number, userBusinessData: GymProfileAboutBusinessRequestDto, userId: number): Promise<{
        status: boolean;
        message: string;
        stepName: string;
        data: {
            description: string;
        };
    }>;
    updateGymBusinessHoursProfile(gymId: number, userBusinessData: GymProfileBusinessOperatingHoursRequestDto): Promise<{
        status: boolean;
        message: string;
        stepName: GymStepName;
        data: [GBHRequest];
    }>;
    updateGymBusinessPhotosProfile(gymId: number, userBusinessData: GymProfilePhotosRequestDto, userId: number): Promise<{
        status: boolean;
        message: string;
        stepName: string;
        data: {
            photos: string;
        };
    }>;
    updateGymUserWaiverProfile(gymId: number, userBusinessData: GymProfileWaiverRequestDto, userId: number): Promise<{
        status: boolean;
        message: string;
        stepName: string;
        data: {
            waiver: string;
        };
    }>;
    updateGymProfileCategory(gymId: number, gymProfileData: GymProfileCategoryRequestDto, userId: number): Promise<any>;
    updateGymUserAmenityProfile(gymId: number, ammenitiesData: GymProfileAmenityRequestDto, userId: number): Promise<{
        status: boolean;
        message: string;
        stepName: GymStepName;
        data: GymProfileAmenityRequestDto;
    }>;
    getGymInstructors(gymId: number, userId: number): Promise<any>;
    updateGymStatus(gymId: number, status: GymStatus): Promise<{
        status: boolean;
        message: string;
    }>;
    updateGymProfile(gymId: number, payload: GymUpdateRequestDto): Promise<{
        status: boolean;
        code: number;
        message: string;
    }>;
    updateFinancialDetails(gymId: number, financialDetails: FinancialDetails, paymentMode: PaymentMode): Promise<{
        message: string;
        status?: undefined;
    } | {
        status: boolean;
        message: string;
    }>;
    getCookedBusinessHoursForDB: (rawBusinessHours: GBHRequest[], gymId: number) => any[];
    getCookedBusinessHoursForResponse: (timeSlots: any) => any[];
    getGymReviews(gymId: string): Promise<{
        status: boolean;
        message: string;
        data: {
            rating: any;
            reviews: any;
        };
    }>;
    getStripeConnectUrl(gymId: any): Promise<{
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
