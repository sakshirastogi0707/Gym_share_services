import { BaseResponseDto } from 'src/utils/base.response.dto';
import { GymProfileAboutBusinessRequestDto } from './gym-profile-about-business-request.dto';
export declare class GymProfileAboutBusinessSuccessDto extends BaseResponseDto {
    stepName: string;
    data: GymProfileAboutBusinessRequestDto;
}
