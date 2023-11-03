import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from '../../../utils/base.response.dto';
import { UpdateUserProfileMedicalHistoryRequestDto } from './update-user-profile-medical-history-request.dto';

export class UserProfileMedicalHistoryUpdateSuccessDto extends BaseResponseDto {
  @ApiProperty()
  stepName: string;

  @ApiProperty()
  data: UpdateUserProfileMedicalHistoryRequestDto;
}
