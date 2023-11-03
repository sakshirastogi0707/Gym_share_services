import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserProfilePicRequestDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  public profilePic: string;
}
