import { GymProfileCategoryRequestDto } from './gym-profile-category-request.dto';
import { BaseResponseDto } from 'src/utils/base.response.dto';
export declare class GymProfileCategoryUpdateSuccessDto extends BaseResponseDto {
    stepName: string;
    data: GymProfileCategoryRequestDto;
}
