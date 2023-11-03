import { FitnessCategoryService } from './fitness.category.service';
import { FitnessCategoryDto } from './dto/fitness-category.dto';
import { FitnessCategory } from './entity/fitness.category.entity';
export declare class FitnessCategoryController {
    private fitnessCategoryService;
    constructor(fitnessCategoryService: FitnessCategoryService);
    create(body: FitnessCategoryDto): Promise<{
        status: boolean;
        message: string;
        data: FitnessCategory;
    }>;
    getAll(): Promise<{
        status: boolean;
        message: string;
        data: FitnessCategory[];
    }>;
    findOne(id: number): Promise<{
        status: boolean;
        message: string;
        data: any;
    }>;
}
