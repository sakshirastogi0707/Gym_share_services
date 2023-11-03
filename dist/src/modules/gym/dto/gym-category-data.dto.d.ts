import { GymSubCategoryDataDto } from './gym-subcategory-data.dto';
export declare class GymCategoryDataDto {
    id: string;
    name: string;
    subCategory: [GymSubCategoryDataDto];
    orderID: string;
}
