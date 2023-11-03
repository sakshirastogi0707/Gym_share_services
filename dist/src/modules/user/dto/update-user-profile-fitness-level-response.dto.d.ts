import { BaseResponseDto } from '../../../utils/base.response.dto';
import { UpdateUserProfileFitnessLevelRequestDto } from './update-user-profile-fitness-level-request.dto';
export declare class UserProfileFitnessLevelUpdateSuccessDto extends BaseResponseDto {
    stepName: string;
    data: UpdateUserProfileFitnessLevelRequestDto;
}
