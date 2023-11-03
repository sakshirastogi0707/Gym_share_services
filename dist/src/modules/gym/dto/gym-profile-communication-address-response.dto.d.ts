import { BaseResponseDto } from 'src/utils/base.response.dto';
import { GymProfileCommunicationAddressRequestDto } from './gym-profile-communication-address-request.dto';
export declare class GymProfileCommunicationAddressSuccessDto extends BaseResponseDto {
    stepName: string;
    data: GymProfileCommunicationAddressRequestDto;
}
