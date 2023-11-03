import { ApiProperty } from '@nestjs/swagger';
import { GymProfileCategoryRequestDto } from './gym-profile-category-request.dto';
import { BaseResponseDto } from 'src/utils/base.response.dto';

export class GymProfileCategoryUpdateSuccessDto extends BaseResponseDto {
  @ApiProperty()
  stepName: string;

  @ApiProperty()
  data: GymProfileCategoryRequestDto;
}
