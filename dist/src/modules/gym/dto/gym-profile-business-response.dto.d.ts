import { BaseResponseDto } from 'src/utils/base.response.dto';
import { GymProfileBusinessRequestDto } from './gym-profile-business-request.dto';
export declare class GymProfileBusinessSuccessDto extends BaseResponseDto {
    stepName: string;
    data: GymProfileBusinessRequestDto;
}
