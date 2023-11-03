import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GymProfileBusinessAddressRequestDto {
  @ApiProperty({
    description: 'Business Address',
    example: '27, Church Street, New York, NY, USA',
  })
  @IsNotEmpty()
  @IsString()
  businessAddress: string;

  @ApiProperty({
    description: 'business palce id on google map',
    example: 'string',
  })
  @IsNotEmpty()
  @IsString()
  placeId: string;
}
