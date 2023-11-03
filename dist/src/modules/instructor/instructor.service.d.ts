import { CreateInstructorDto, UpdateInstructorDto } from './dto/create-instructor.dto';
import { Instructor } from './entities/instructor.entity';
import { Repository } from 'typeorm';
import { Certificate } from './entities/certificate.entity';
import { InstructorTrainedFor } from './entities/trained_for.entity';
import { Gym } from '../gym/entities/gym.entity';
import { FitnessSubCategory } from '../user/entity/fitness.subcategory.entity';
import { FitnessCategory } from '../user/entity/fitness.category.entity';
export declare class InstructorService {
    private instructorRepository;
    private certificateRepository;
    private tarinedForRepository;
    private gymRepository;
    private categoryRepo;
    private subcategoryRepo;
    constructor(instructorRepository: Repository<Instructor>, certificateRepository: Repository<Certificate>, tarinedForRepository: Repository<InstructorTrainedFor>, gymRepository: Repository<Gym>, categoryRepo: Repository<FitnessCategory>, subcategoryRepo: Repository<FitnessSubCategory>);
    create(createInstructorDto: CreateInstructorDto): Promise<{
        status: boolean;
        message: string;
        data: {
            trainedFor: any[];
            name: string;
            photo: string;
            about: string;
            expYears: number;
            expMonths: number;
            dob: Date;
            gymId: number;
            certificates: [import("./dto/certificate.model").Certificate];
        };
    }>;
    validateInstructorCategory(createInstructorDto: CreateInstructorDto): Promise<void>;
    findAll(): Promise<Instructor[]>;
    findOne(id: number): Promise<{
        status: boolean;
        message: string;
        data?: undefined;
    } | {
        status: boolean;
        message: string;
        data: any;
    }>;
    update(id: number, updateInstructorDto: Partial<UpdateInstructorDto>): Promise<{
        status: boolean;
        message: string;
        data: {
            trainedFor: InstructorTrainedFor[];
            name: string;
            photo: string;
            dob: Date;
            about: string;
            expYears: number;
            expMonths: number;
            gym: Gym;
            certificates: Certificate[];
            classes: import("../class/entities/class.entity").Class[];
            active: boolean;
            id: bigint;
            createdAt: Date;
            modifiedAt: Date;
        };
    }>;
    remove(id: number): Promise<{
        status: boolean;
        message: string;
    }>;
}
