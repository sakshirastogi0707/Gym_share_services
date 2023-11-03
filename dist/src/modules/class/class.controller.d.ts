import { ClassService } from './class.service';
import { ClassDto, ClassListRequestParamsDto, ClassListSortRequestParamsDto, FavouritesListDto, UpdateClassDataDto } from './dto/class.dto';
import { Request } from 'express';
export declare class ClassController {
    private readonly classService;
    constructor(classService: ClassService);
    getFavourites(query: FavouritesListDto, req: Request): Promise<any>;
    create(gymId: number, createClassDto: ClassDto): Promise<{
        status: boolean;
        message: string;
        data: import("./entities/class.entity").Class;
    }>;
    list(query: ClassListRequestParamsDto, req: Request, gymId: string): Promise<{
        status: boolean;
        message: string;
        data: {
            classes: any[];
            numberOfRecords: number;
        };
    }>;
    listForUsers(query: ClassListSortRequestParamsDto): Promise<{
        status: boolean;
        message: string;
        data: {
            classes: any[];
            numberOfRecords: number;
        };
    }>;
    delete(id: number): Promise<{
        status: number;
        message: string;
    }>;
    getClassDetailsById(classId: string): Promise<{
        status: boolean;
        message: string;
        data: any;
    }>;
    updateClassDetailsById(gymId: string, classId: string, updateClassDataDto: UpdateClassDataDto): Promise<{
        status: number;
        message: string;
        data: import("./entities/class.entity").Class;
    }>;
    getGymInstructors(instructorId: number, classId: number): Promise<any>;
    addToFavourites(classId: number, req: Request): Promise<any>;
    deleteFavourites(classId: number, req: Request): Promise<any>;
}
