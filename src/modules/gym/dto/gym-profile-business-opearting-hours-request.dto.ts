import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { TimeSlot } from './business-hours-data.dto';

export class GBHRequest {
  @ApiProperty({
    description: 'Business Operating Weekdays',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  public day: number;

  @ApiProperty({
    name: 'timeSlots',
    type: () => [TimeSlot],
  })
  public timeSlots: TimeSlot[];

  @ApiProperty({
    description: 'Open 24-Hours',
    example: 'True or False',
  })
  @IsOptional()
  @IsBoolean()
  public open24Hour: boolean;
}

export class GymProfileBusinessOperatingHoursRequestDto {
  @ApiProperty({
    name: 'data',
    type: () => [GBHRequest],
  })
  public data: [GBHRequest];
}
