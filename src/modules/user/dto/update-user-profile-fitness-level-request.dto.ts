import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserProfileFitnessLevelRequestDto {
  @ApiProperty({
    description: 'List of all fitness experience',
    example: 'Beginner' || 'Experienced' || 'Intermediate',
  })
  @IsNotEmpty()
  experienceLevel: string;
}
