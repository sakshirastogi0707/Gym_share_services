import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GymProfileCommunicationAddressRequestDto {
  @ApiProperty({
    description: 'Business Address',
    example: '27, Church Street, New York, NY, USA',
  })
  @IsNotEmpty()
  @IsString()
  communicationAddress: string;
}
