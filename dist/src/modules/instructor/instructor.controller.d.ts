import { InstructorService } from './instructor.service';
import { CreateInstructorDto, UpdateInstructorDto } from './dto/create-instructor.dto';
export declare class InstructorController {
    private readonly instructorService;
    constructor(instructorService: InstructorService);
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
    findAll(): Promise<import("./entities/instructor.entity").Instructor[]>;
    findOne(id: string): Promise<{
        status: boolean;
        message: string;
        data?: undefined;
    } | {
        status: boolean;
        message: string;
        data: any;
    }>;
    update(id: number, updateInstructorDto: UpdateInstructorDto): Promise<{
        status: boolean;
        message: string;
        data: {
            trainedFor: import("./entities/trained_for.entity").InstructorTrainedFor[];
            name: string;
            photo: string;
            dob: Date;
            about: string;
            expYears: number;
            expMonths: number;
            gym: import("../gym/entities/gym.entity").Gym;
            certificates: import("./entities/certificate.entity").Certificate[];
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
