import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { BaseResponseDto } from 'src/utils/base.response.dto';
import { GymProfileAmenityRequestDto } from './gym-profile-amenity-request.dto';

export class GymProfileAmenitySuccessDto extends BaseResponseDto {
  @ApiProperty()
  @IsNumber()
  stepName: string;

  @ApiProperty()
  data: GymProfileAmenityRequestDto;
}
