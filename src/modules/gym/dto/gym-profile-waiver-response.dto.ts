import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/utils/base.response.dto';
import { GymProfileWaiverRequestDto } from './gym-profile-waiver-request.dto';

export class GymProfileWaiverSuccessDto extends BaseResponseDto {
  @ApiProperty()
  stepName: string;

  @ApiProperty()
  data: GymProfileWaiverRequestDto;
}
