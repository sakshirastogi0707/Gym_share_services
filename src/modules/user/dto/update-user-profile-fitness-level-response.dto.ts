import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from '../../../utils/base.response.dto';
import { UpdateUserProfileFitnessLevelRequestDto } from './update-user-profile-fitness-level-request.dto';

export class UserProfileFitnessLevelUpdateSuccessDto extends BaseResponseDto {
  @ApiProperty()
  stepName: string;

  @ApiProperty()
  data: UpdateUserProfileFitnessLevelRequestDto;
}
