import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class SessionDto {
  @ApiProperty({
    description: 'On date',
    example: '2012-11-11',
  })
  @IsNotEmpty()
  @IsDateString()
  onDate: Date;

  @ApiProperty({
    description: 'Start Time',
    example: '12:10',
  })
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({
    description: 'End Time',
    example: '13:10',
  })
  @IsNotEmpty()
  endTime: string;

  @ApiProperty({
    description: 'List of all active sessions',
    example: 'True or False',
  })
  @IsOptional()
  isActive: boolean;
}
