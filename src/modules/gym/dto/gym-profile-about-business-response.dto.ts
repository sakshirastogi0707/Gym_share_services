import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/utils/base.response.dto';
import { GymProfileAboutBusinessRequestDto } from './gym-profile-about-business-request.dto';

export class GymProfileAboutBusinessSuccessDto extends BaseResponseDto {
  @ApiProperty()
  stepName: string;

  @ApiProperty()
  data: GymProfileAboutBusinessRequestDto;
}
