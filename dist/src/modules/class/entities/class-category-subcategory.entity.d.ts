import { Class } from './class.entity';
import { FitnessCategory } from '../../user/entity/fitness.category.entity';
import { FitnessSubCategory } from '../../user/entity/fitness.subcategory.entity';
import { BaseModel } from 'src/utils/base.model';
export declare class ClassCategorySubcategory extends BaseModel {
    id: bigint;
    class: Class;
    categoryId: number;
    category: FitnessCategory;
    subCategoryId: number;
    subcategory: FitnessSubCategory;
}
