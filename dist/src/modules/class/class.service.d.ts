import { Repository } from 'typeorm';
import { Class } from './entities/class.entity';
import { ClassCategorySubcategory } from './entities/class-category-subcategory.entity';
import { ClassDto, ClassListSortRequestParamsDto, FavouritesListDto, UpdateClassDataDto } from './dto/class.dto';
import { ClassListRequestParamsDto } from './dto/class.dto';
import { SessionSchedule } from './entities/session-schedule.entity';
import { Instructor } from '../instructor/entities/instructor.entity';
import { Gym } from '../gym/entities/gym.entity';
import { Session } from './entities/session.entity';
import { Favourites } from './entities/favourites.entity';
import { User } from '../user/entity/user.entity';
export declare class ClassService {
    private classRepository;
    private classCategorySubcategoryRepository;
    private sessionScheduleCofigRepository;
    private instructorRepository;
    private gymRepository;
    private instructorRepo;
    private sessionRepo;
    private favouritesRepository;
    private userRepository;
    constructor(classRepository: Repository<Class>, classCategorySubcategoryRepository: Repository<ClassCategorySubcategory>, sessionScheduleCofigRepository: Repository<SessionSchedule>, instructorRepository: Repository<Instructor>, gymRepository: Repository<Gym>, instructorRepo: Repository<Instructor>, sessionRepo: Repository<Session>, favouritesRepository: Repository<Favourites>, userRepository: Repository<User>);
    create(gymId: number, classPayload: ClassDto): Promise<{
        status: boolean;
        message: string;
        data: Class;
    }>;
    validateSession(classData: Class): Promise<void>;
    saveSessionData(classData: Class): Promise<void>;
    createDontRepeatSession(classData: Class): Promise<Session>;
    createSession(classData: Class): Promise<Session>;
    createDailyRepeatSession(classData: Class): Promise<void>;
    createCustomSession(classData: Class): Promise<void>;
    createWeeklyRepeatSession(classData: Class): Promise<void>;
    createCustomDailyRepeatSession(classData: Class): Promise<void>;
    createCustomWeeklyRepeatSession(classData: Class): Promise<void>;
    createMonthlyRepeatSession(classData: Class): Promise<void>;
    createCustomMonthlyRepeatSession(classData: Class): Promise<void>;
    findAll(queryParams: ClassListRequestParamsDto, gymId: string): Promise<{
        status: boolean;
        message: string;
        data: {
            classes: any[];
            numberOfRecords: number;
        };
    }>;
    findClassForUsers(queryParams: ClassListSortRequestParamsDto): Promise<{
        status: boolean;
        message: string;
        data: {
            classes: any[];
            numberOfRecords: number;
        };
    }>;
    getClassDetailsById(classId: string): Promise<{
        status: boolean;
        message: string;
        data: any;
    }>;
    updateClassDetailsById(gymId: string, classId: string, classPayload: UpdateClassDataDto): Promise<{
        status: number;
        message: string;
        data: Class;
    }>;
    findOne(id: number): Promise<{
        status: boolean;
        message: string;
        data?: undefined;
    } | {
        status: boolean;
        message: string;
        data: any;
    }>;
    delete(id: number): Promise<{
        status: number;
        message: string;
    }>;
    private isValidTiming;
    instructorDetails(classId: number, id: number): Promise<any>;
    addToFavourites(userId: number, classId: number): Promise<any>;
    getFavourites(userId: number, queryParams: FavouritesListDto): Promise<any>;
    removeFromFavourites(userId: number, classId: number): Promise<any>;
}
