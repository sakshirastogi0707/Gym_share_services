import { FitnessCategory } from '../../user/entity/fitness.category.entity';
import { FitnessSubCategory } from '../../user/entity/fitness.subcategory.entity';
import { BaseModel } from 'src/utils/base.model';
import { Gym } from './gym.entity';
export declare class GymCategorySubCategory extends BaseModel {
    id: bigint;
    uuid: string;
    gymId: number;
    gym: Gym;
    categoryId: number;
    category: FitnessCategory;
    subCategoryId: number;
    subcategory: FitnessSubCategory;
}
