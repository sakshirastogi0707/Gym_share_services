import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserProfileBasicRequestDto {
  @ApiProperty({
    description: 'Email Id',
    example: 'babarj@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  emailId: string;

  @ApiProperty({
    description: 'Full Name',
    example: 'Babar Javaid',
  })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({
    description: 'Birthdate',
    example: 'yyyy-mm-dd',
  })
  @IsNotEmpty()
  @Type(() => Date)
  birthDate: Date;
}
