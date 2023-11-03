import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class GymProfileOwnerRequestDto {
  @ApiProperty({
    description: 'Owner Email Id',
    example: 'kunalk@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  ownerEmail: string;

  @ApiProperty({
    description: 'Owner Name',
    example: 'Kunal Kumar',
  })
  @IsNotEmpty()
  @IsString()
  ownerName: string;

  @ApiProperty({
    description: 'Owner Phone Number',
    example: '+916767565689',
  })
  @IsNotEmpty()
  @IsString()
  ownerPhoneNumber: string;

  @ApiProperty({
    description: 'Birthdate',
    example: 'yyyy-mm-dd',
  })
  @IsNotEmpty()
  @Type(() => Date)
  birthDate: Date;
}
