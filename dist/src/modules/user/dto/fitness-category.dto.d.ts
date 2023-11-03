import { FitnessSubCategoryDto } from './fitness-subcategory.dto';
import { BaseResponseDto } from 'src/utils/base.response.dto';
export declare class FitnessCategoryDto extends BaseResponseDto {
    name: string;
    description: string;
    icon: string;
    orderId: number;
    subCategory: [FitnessSubCategoryDto];
    isActive: boolean;
}
