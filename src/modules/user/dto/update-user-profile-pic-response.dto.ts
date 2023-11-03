import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from '../../../utils/base.response.dto';
import { UpdateUserProfilePicRequestDto } from './update-user-profile-pic-request.dto';

export class UserProfilePicUpdateSuccessDto extends BaseResponseDto {
  @ApiProperty()
  stepName: string;
  @ApiProperty()
  data: UpdateUserProfilePicRequestDto;
}
