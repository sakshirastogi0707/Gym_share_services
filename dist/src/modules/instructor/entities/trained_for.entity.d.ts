import { Instructor } from './instructor.entity';
import { FitnessSubCategory } from '../../user/entity/fitness.subcategory.entity';
import { BaseModel } from 'src/utils/base.model';
import { FitnessCategory } from 'src/modules/user/entity/fitness.category.entity';
export declare class InstructorTrainedFor extends BaseModel {
    id: bigint;
    instructorId: number;
    instructor: Instructor;
    categoryId: number;
    subCategoryId: number;
    subcategory: FitnessSubCategory;
    category: FitnessCategory;
}
