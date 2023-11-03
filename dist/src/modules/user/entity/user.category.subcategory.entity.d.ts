import { User } from './user.entity';
import { FitnessCategory } from './fitness.category.entity';
import { FitnessSubCategory } from './fitness.subcategory.entity';
import { BaseModel } from 'src/utils/base.model';
export declare class UserCategorySubCategory extends BaseModel {
    id: bigint;
    uuid: string;
    userId: number;
    user: User;
    categoryId: number;
    category: FitnessCategory;
    subCategoryId: number;
    subcategory: FitnessSubCategory;
}
