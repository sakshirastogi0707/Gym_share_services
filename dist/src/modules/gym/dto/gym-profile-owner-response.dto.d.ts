import { BaseResponseDto } from 'src/utils/base.response.dto';
import { GymProfileOwnerRequestDto } from './gym-profile-owner-request.dto';
export declare class GymProfileOwnerSuccessDto extends BaseResponseDto {
    stepName: string;
    data: GymProfileOwnerRequestDto;
}
