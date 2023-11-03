import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { LeadType } from 'src/enums/lead-type.enum';

export class CreateLeadDto {
  @ApiProperty({
    description: 'Name',
    example: 'John Kelly',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email Id',
    example: 'demouser@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  emailId: string;

  @ApiProperty({
    description: 'Phone number',
    example: '+16701718980',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string | any;

  @ApiProperty({
    description: 'Address',
    example: 'CA, California, USA',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'LeadType',
    example: '100' || '200',
  })
  @IsNotEmpty()
  @IsEnum(LeadType)
  public leadType: LeadType;
}
