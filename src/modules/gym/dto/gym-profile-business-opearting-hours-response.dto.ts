import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/utils/base.response.dto';
import { GBHRequest } from './gym-profile-business-opearting-hours-request.dto';

export class GymProfileBusinessOperatingHoursSuccessDto extends BaseResponseDto {
  @ApiProperty()
  stepName: string;

  @ApiProperty({
    type: () => [GBHRequest],
  })
  data: [GBHRequest];
}
