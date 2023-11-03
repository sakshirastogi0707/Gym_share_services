import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SomeoneElseModel {
  @ApiProperty({
    description: 'Relationship',
    example: 'Father',
  })
  @IsString()
  relationship: string;

  @ApiProperty({
    description: 'Name',
    example: 'Elon Musk',
  })
  @IsString()
  name: string;

  @ApiProperty({
    name: 'phone_number',
    description: 'Phone no.',
    example: '989898123',
  })
  @IsString()
  phoneNumber: string;
}
