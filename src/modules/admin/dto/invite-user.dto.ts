import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserType } from 'src/enums/user-type.enum';
import { BaseResponseDto } from 'src/utils/base.response.dto';

export class InviteUserRequestDto {
  @ApiProperty({
    description: 'Name',
    example: 'John Kelly',
  })
  @IsString()
  @IsOptional()
  fullName: string;

  @ApiProperty({
    description: 'Email Id',
    example: 'demouser@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  emailId: string;

  @ApiProperty({
    description: 'UserType',
    example: 'Gym' || 'User',
  })
  @IsNotEmpty()
  @IsEnum(UserType)
  public userType: UserType;
}

export class AdminUserViewData {
  @ApiProperty({
    description: 'Name',
    example: 'John Kelly',
  })
  fullName: string;

  @ApiProperty({
    description: 'Email Id',
    example: 'demouser@gmail.com',
  })
  emailId: string;

  @ApiProperty({
    description: 'Phone number',
    example: '+16701718980',
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'Source',
    example: 'Self' || 'Invited',
  })
  source: string;

  @ApiProperty({
    description: 'Status',
  })
  userStatus: string;

  @ApiProperty({
    description: 'UserType',
    example: 'Gym' || 'User',
  })
  public userType: UserType;
}

export class GetUserViewResponseSuccessDto extends BaseResponseDto {
  @ApiProperty()
  data: AdminUserViewData;
}
