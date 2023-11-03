import { BaseModel } from 'src/utils/base.model';
import { UserCategorySubCategory } from './user.category.subcategory.entity';
import { FitnessSubCategory } from './fitness.subcategory.entity';
import { GymCategorySubCategory } from 'src/modules/gym/entities/gym.category.subcategory.entity';
import { InstructorTrainedFor } from 'src/modules/instructor/entities/trained_for.entity';
import { ClassCategorySubcategory } from 'src/modules/class/entities/class-category-subcategory.entity';
export declare class FitnessCategory extends BaseModel {
    name: string;
    description: string;
    icon: string;
    orderId: number;
    isActive: boolean;
    subcategory: FitnessSubCategory[];
    userCategorySubcategories: UserCategorySubCategory[];
    classCategorySubcategories: ClassCategorySubcategory[];
    gymCategorySubcategories: GymCategorySubCategory[];
    trainedForCategory: InstructorTrainedFor[];
}
