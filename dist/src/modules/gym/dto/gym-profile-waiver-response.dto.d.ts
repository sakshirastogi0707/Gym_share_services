import { BaseResponseDto } from 'src/utils/base.response.dto';
import { GymProfileWaiverRequestDto } from './gym-profile-waiver-request.dto';
export declare class GymProfileWaiverSuccessDto extends BaseResponseDto {
    stepName: string;
    data: GymProfileWaiverRequestDto;
}
