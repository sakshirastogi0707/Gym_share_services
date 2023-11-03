import { ApiProperty } from '@nestjs/swagger';
import { UpdateUserProfileCategoryRequestDto } from './user.dto';
import { BaseResponseDto } from 'src/utils/base.response.dto';

export class UserProfileCategoryUpdateSuccessDto extends BaseResponseDto {
  @ApiProperty()
  stepName: string;

  @ApiProperty()
  data: UpdateUserProfileCategoryRequestDto;
}
