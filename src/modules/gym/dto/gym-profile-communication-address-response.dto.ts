import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/utils/base.response.dto';
import { GymProfileCommunicationAddressRequestDto } from './gym-profile-communication-address-request.dto';

export class GymProfileCommunicationAddressSuccessDto extends BaseResponseDto {
  @ApiProperty()
  stepName: string;

  @ApiProperty()
  data: GymProfileCommunicationAddressRequestDto;
}
