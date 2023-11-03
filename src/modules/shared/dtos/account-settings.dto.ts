import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';
import { BaseResponseDto } from 'src/utils/base.response.dto';

export class AccountSettings {
  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  notificationsEnabled: boolean;

  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  remindersEnabled: boolean;
}

export class GetAccountSettings extends BaseResponseDto {
  @ApiProperty()
  data: AccountSettings;
}
