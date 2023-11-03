import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/utils/base.response.dto';
import { GymProfileBusinessAddressRequestDto } from './gym-profile-business-address-request.dto';

export class GymProfileBusinessAddressSuccessDto extends BaseResponseDto {
  @ApiProperty()
  stepName: string;

  @ApiProperty()
  data: GymProfileBusinessAddressRequestDto;
}
