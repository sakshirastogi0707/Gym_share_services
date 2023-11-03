import { FitnessSubCategoryService } from './fitness.subcategory.service';
import { FitnessSubCategoryDto } from './dto/fitness-subcategory.dto';
export declare class FitnessSubCategoryController {
    private readonly fitnessSubCategoryService;
    constructor(fitnessSubCategoryService: FitnessSubCategoryService);
    create(body: FitnessSubCategoryDto): Promise<{
        status: boolean;
        message: string;
        data: import("./entity/fitness.category.entity").FitnessCategory;
    }>;
    findAll(): Promise<{
        status: boolean;
        message: string;
        data: import("./entity/fitness.subcategory.entity").FitnessSubCategory[];
    }>;
    findOne(id: number): Promise<{
        status: boolean;
        message: string;
        data: import("./entity/fitness.subcategory.entity").FitnessSubCategory[];
    }>;
}
