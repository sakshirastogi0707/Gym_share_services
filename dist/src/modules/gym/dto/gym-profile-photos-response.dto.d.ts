import { BaseResponseDto } from 'src/utils/base.response.dto';
import { GymProfilePhotosRequestDto } from './gym-profile-photos-request.dto';
export declare class GymProfilePhotosSuccessDto extends BaseResponseDto {
    stepName: string;
    data: GymProfilePhotosRequestDto;
}
