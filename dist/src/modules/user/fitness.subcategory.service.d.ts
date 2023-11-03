import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { FitnessSubCategoryDto } from './dto/fitness-subcategory.dto';
import { FitnessCategory } from './entity/fitness.category.entity';
import { FitnessSubCategory } from './entity/fitness.subcategory.entity';
import { UserCategorySubCategory } from './entity/user.category.subcategory.entity';
export declare class FitnessSubCategoryService {
    private userService;
    private fitnessCategoryRepository;
    private fitnessSubCategoryRepository;
    private userCategorySubCategoryRepository;
    constructor(userService: UserService, fitnessCategoryRepository: Repository<FitnessCategory>, fitnessSubCategoryRepository: Repository<FitnessSubCategory>, userCategorySubCategoryRepository: Repository<UserCategorySubCategory>);
    createFitnessSubCategory(body: FitnessSubCategoryDto): Promise<{
        status: boolean;
        message: string;
        data: FitnessCategory;
    }>;
    getAllSubCategory(): Promise<{
        status: boolean;
        message: string;
        data: FitnessSubCategory[];
    }>;
    getAllFitnessSubCategoryById(id: number): Promise<{
        status: boolean;
        message: string;
        data: FitnessSubCategory[];
    }>;
    updateAllFitnessSubCategoryById(id: number): Promise<{
        status: boolean;
        message: string;
        data: any;
    }>;
}
