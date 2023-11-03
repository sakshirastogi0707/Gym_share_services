import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/utils/base.response.dto';
import { GymProfileOwnerRequestDto } from './gym-profile-owner-request.dto';

export class GymProfileOwnerSuccessDto extends BaseResponseDto {
  @ApiProperty()
  stepName: string;

  @ApiProperty()
  data: GymProfileOwnerRequestDto;
}
