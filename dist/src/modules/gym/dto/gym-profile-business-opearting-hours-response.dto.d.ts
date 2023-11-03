import { BaseResponseDto } from 'src/utils/base.response.dto';
import { GBHRequest } from './gym-profile-business-opearting-hours-request.dto';
export declare class GymProfileBusinessOperatingHoursSuccessDto extends BaseResponseDto {
    stepName: string;
    data: [GBHRequest];
}
