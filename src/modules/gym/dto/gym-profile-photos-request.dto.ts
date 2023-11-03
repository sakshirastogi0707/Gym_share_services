import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GymProfilePhotosRequestDto {
  @ApiProperty({
    description: 'Gym Logo',
    example: 'photo://gymlogo',
  })
  @IsNotEmpty()
  @IsString()
  photos: string;
}
