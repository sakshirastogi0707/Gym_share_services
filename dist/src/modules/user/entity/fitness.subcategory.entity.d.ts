import { BaseModel } from 'src/utils/base.model';
import { UserCategorySubCategory } from './user.category.subcategory.entity';
import { FitnessCategory } from './fitness.category.entity';
import { GymCategorySubCategory } from 'src/modules/gym/entities/gym.category.subcategory.entity';
import { InstructorTrainedFor } from 'src/modules/instructor/entities/trained_for.entity';
import { ClassCategorySubcategory } from 'src/modules/class/entities/class-category-subcategory.entity';
export declare class FitnessSubCategory extends BaseModel {
    name: string;
    description: string;
    orderId: number;
    isActive: boolean;
    category: FitnessCategory;
    userCategorySubcategories: UserCategorySubCategory[];
    classCategorySubcategories: ClassCategorySubcategory[];
    gymCategorySubcategories: GymCategorySubCategory[];
    trainedForSubcategories: InstructorTrainedFor[];
}
