import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GymProfileWaiverRequestDto {
  @ApiProperty({
    description: 'Waiver',
    example: 'waiver data',
  })
  @IsNotEmpty()
  @IsString()
  waiver: string;
  @ApiProperty({
    description: 'WaiverName',
    example: 'waiver data',
  })
  @IsNotEmpty()
  @IsString()
  waiverName: string;
}
