import { BaseResponseDto } from '../../../utils/base.response.dto';
import { UpdateUserProfileBasicRequestDto } from './update-user-profile-basic-request.dto';
export declare class UserProfileBasicUpdateSuccessDto extends BaseResponseDto {
    stepName: string;
    data: UpdateUserProfileBasicRequestDto;
}
