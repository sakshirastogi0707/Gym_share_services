import { BaseResponseDto } from 'src/utils/base.response.dto';
import { GymProfileBusinessAddressRequestDto } from './gym-profile-business-address-request.dto';
export declare class GymProfileBusinessAddressSuccessDto extends BaseResponseDto {
    stepName: string;
    data: GymProfileBusinessAddressRequestDto;
}
