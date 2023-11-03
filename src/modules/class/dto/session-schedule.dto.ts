import { ApiProperty } from '@nestjs/swagger';
import { CustomDetailsDto } from './custom-details.dto';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsOptional,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { ClassRepeat } from 'src/enums/class.enum';
import { BaseUtils } from 'src/utils/base.utils';
export class SessionScheduleDto {
  @ApiProperty({
    description: 'Start date',
    example: '2023-11-11',
  })
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @ApiProperty({
    description: 'End date',
    example: '2023-12-12',
  })
  @IsOptional()
  @IsDateString()
  endDate: Date;

  @ApiProperty({
    description: 'Start Time',
    example: '12:10',
  })
  startTime: string;

  @ApiProperty({
    description: 'End Time',
    example: '13:10',
  })
  endTime: string;

  @ApiProperty({
    description: 'Occurences',
    example: 10,
  })
  @IsOptional()
  occurences: number;

  @ApiProperty({
    description: 'Repeat',
    example: BaseUtils.getEnumKeys(ClassRepeat).join('/'),
  })
  @IsIn(BaseUtils.getEnumKeys(ClassRepeat), {
    message: `repeat can only be ${BaseUtils.getEnumKeys(ClassRepeat)}`,
  })
  repeat: string;

  @ApiProperty({
    type: () => CustomDetailsDto,
  })
  @Type(() => CustomDetailsDto)
  @ValidateIf((o) => o.repeat === ClassRepeat[ClassRepeat.Custom])
  @ValidateNested()
  customDetails: CustomDetailsDto;
}

export class UpdateSessionScheduleDto extends SessionScheduleDto {}
