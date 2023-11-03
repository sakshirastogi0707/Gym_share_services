import { Repository } from 'typeorm';
import { FitnessCategory } from './entity/fitness.category.entity';
import { UserService } from './user.service';
import { FitnessCategoryDto } from './dto/fitness-category.dto';
import { UserCategorySubCategory } from './entity/user.category.subcategory.entity';
export declare class FitnessCategoryService {
    private userService;
    private fitnessCategoryRepository;
    private userCategorySubCategoryRepository;
    constructor(userService: UserService, fitnessCategoryRepository: Repository<FitnessCategory>, userCategorySubCategoryRepository: Repository<UserCategorySubCategory>);
    createFitnessCategory(body: FitnessCategoryDto): Promise<FitnessCategory>;
    getFitnessCategoryById(id: number): Promise<{
        status: boolean;
        message: string;
        data: any;
    }>;
    updateFitnessCategoryById(id: number): Promise<FitnessCategory>;
    findOne(id: number): Promise<any>;
    getAllPreferredFitnessCategories(): Promise<{
        status: boolean;
        message: string;
        data: FitnessCategory[];
    }>;
}
