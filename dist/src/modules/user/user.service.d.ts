import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateEarlyUserSignupRequestDto, UpdateUserNameLocationRequestDto, UpdateUserProfileCategoryRequestDto, UpdateUserSignupRequestDto } from './dto/user.dto';
import { UserCategorySubCategory } from './entity/user.category.subcategory.entity';
import { UpdateUserProfileBasicRequestDto } from './dto/update-user-profile-basic-request.dto';
import { UpdateUserProfilePicRequestDto } from './dto/update-user-profile-pic-request.dto';
import { UpdateUserProfileFitnessLevelRequestDto } from './dto/update-user-profile-fitness-level-request.dto';
import { UpdateUserProfileMedicalHistoryRequestDto } from './dto/update-user-profile-medical-history-request.dto';
import { UpdateUserProfileDocumentRequestDto } from './dto/update-user-profile-document-request.dto';
import { Gym } from '../gym/entities/gym.entity';
import { EmailService } from 'src/utils/email.service';
export declare class UserService {
    private userRepository;
    private gymRepository;
    private userCategorySubCategoryRepository;
    private emailService;
    constructor(userRepository: Repository<User>, gymRepository: Repository<Gym>, userCategorySubCategoryRepository: Repository<UserCategorySubCategory>, emailService: EmailService);
    createUser(user: UpdateUserSignupRequestDto, firebase_uuid: string): Promise<{
        userType: string;
        userStatus: string;
        userCategorySubcategories: UserCategorySubCategory[];
        gyms: Gym[];
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
    }>;
    getUserProfile(user: any): Promise<{
        status: boolean;
        message: string;
        data: any;
    }>;
    getUser(firebase_uuid: string, email_id: string): Promise<User>;
    getUserByFirebaseId(firebase_uuid: string): Promise<User>;
    deleteUser(users: any): Promise<{
        status: boolean;
        message: string;
    }>;
    updateUserProfileBasic(userProfileData: UpdateUserProfileBasicRequestDto, firebase_uuid: any): Promise<any>;
    updateUserProfilePic(userProfileData: UpdateUserProfilePicRequestDto, firebase_uuid: any): Promise<any>;
    updateUserProfileFitnessLevel(userProfileData: UpdateUserProfileFitnessLevelRequestDto, firebase_uuid: any): Promise<{
        status: boolean;
        message: string;
        stepName: string;
        data: {
            experienceLevel: string;
        };
    }>;
    updateUserProfileMedicalHistory(userProfileData: UpdateUserProfileMedicalHistoryRequestDto, firebase_uuid: any): Promise<{
        status: boolean;
        message: string;
        stepName: string;
        data: {
            medicalHistory: string[];
        };
    }>;
    updateUserProfileCategory(userProfileData: UpdateUserProfileCategoryRequestDto, firebase_uuid: any): Promise<any>;
    updateUserProfileDocument(userProfileData: UpdateUserProfileDocumentRequestDto, firebase_uuid: any): Promise<any>;
    updateUserNameLocation(userProfileData: UpdateUserNameLocationRequestDto, firebase_uuid: any): Promise<{
        status: boolean;
        message: string;
        data: UpdateUserNameLocationRequestDto;
    }>;
    createEarlyUser(user: CreateEarlyUserSignupRequestDto, firebase_uuid: string, userStatus: number, source: number): Promise<{}>;
    checkDuplicateNumber(number: string): Promise<{
        status: number;
        message: string;
    }>;
}
