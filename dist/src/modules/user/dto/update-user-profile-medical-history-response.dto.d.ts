import { BaseResponseDto } from '../../../utils/base.response.dto';
import { UpdateUserProfileMedicalHistoryRequestDto } from './update-user-profile-medical-history-request.dto';
export declare class UserProfileMedicalHistoryUpdateSuccessDto extends BaseResponseDto {
    stepName: string;
    data: UpdateUserProfileMedicalHistoryRequestDto;
}
