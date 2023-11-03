import { BaseResponseDto } from 'src/utils/base.response.dto';
import { GymProfileAmenityRequestDto } from './gym-profile-amenity-request.dto';
export declare class GymProfileAmenitySuccessDto extends BaseResponseDto {
    stepName: string;
    data: GymProfileAmenityRequestDto;
}
