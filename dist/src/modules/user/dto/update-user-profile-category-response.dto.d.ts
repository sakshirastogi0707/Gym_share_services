import { UpdateUserProfileCategoryRequestDto } from './user.dto';
import { BaseResponseDto } from 'src/utils/base.response.dto';
export declare class UserProfileCategoryUpdateSuccessDto extends BaseResponseDto {
    stepName: string;
    data: UpdateUserProfileCategoryRequestDto;
}
