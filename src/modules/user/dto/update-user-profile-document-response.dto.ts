import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from '../../../utils/base.response.dto';
import { UpdateUserProfileDocumentRequestDto } from './update-user-profile-document-request.dto';

export class UserProfileDocumentUpdateSuccessDto extends BaseResponseDto {
  @ApiProperty()
  stepName: string;
  @ApiProperty()
  data: UpdateUserProfileDocumentRequestDto;
}
