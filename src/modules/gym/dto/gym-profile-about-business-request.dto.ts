import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GymProfileAboutBusinessRequestDto {
  @ApiProperty({
    description: 'description',
    example:
      'An American chain of international co-ed fitness centers originally started by Joe Gold in Venice Beach, California',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
