import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/utils/base.response.dto';
import { GymProfilePhotosRequestDto } from './gym-profile-photos-request.dto';

export class GymProfilePhotosSuccessDto extends BaseResponseDto {
  @ApiProperty()
  stepName: string;

  @ApiProperty()
  data: GymProfilePhotosRequestDto;
}
