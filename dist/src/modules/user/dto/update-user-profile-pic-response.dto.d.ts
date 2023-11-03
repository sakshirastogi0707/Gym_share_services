import { BaseResponseDto } from '../../../utils/base.response.dto';
import { UpdateUserProfilePicRequestDto } from './update-user-profile-pic-request.dto';
export declare class UserProfilePicUpdateSuccessDto extends BaseResponseDto {
    stepName: string;
    data: UpdateUserProfilePicRequestDto;
}
