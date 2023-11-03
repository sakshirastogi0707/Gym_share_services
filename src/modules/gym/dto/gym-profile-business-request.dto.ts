import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class GymProfileBusinessRequestDto {
  @ApiProperty({
    description: 'Business Name',
    example: 'Warner Bros.',
  })
  @IsNotEmpty()
  @IsString()
  businessName: string;

  @ApiProperty({
    description: 'Business Email Id',
    example: 'warnerb@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  businessEmail: string;

  @ApiProperty({
    description: 'Business Contract',
    example: '+916767565689',
  })
  @IsNotEmpty()
  @IsString()
  businessContact: string;

  @ApiProperty({
    description: 'Business Category',
    example: 'Fitness Studio' || 'Trainer' || 'Wellness Center',
  })
  @IsNotEmpty()
  category: string;
}
