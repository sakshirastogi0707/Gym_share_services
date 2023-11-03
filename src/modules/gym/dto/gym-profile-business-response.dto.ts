import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/utils/base.response.dto';
import { GymProfileBusinessRequestDto } from './gym-profile-business-request.dto';

export class GymProfileBusinessSuccessDto extends BaseResponseDto {
  @ApiProperty()
  stepName: string;

  @ApiProperty()
  data: GymProfileBusinessRequestDto;
}
