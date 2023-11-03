import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from '../../../utils/base.response.dto';
import { UpdateUserProfileBasicRequestDto } from './update-user-profile-basic-request.dto';

export class UserProfileBasicUpdateSuccessDto extends BaseResponseDto {
  @ApiProperty()
  stepName: string;
  @ApiProperty()
  data: UpdateUserProfileBasicRequestDto;
}
