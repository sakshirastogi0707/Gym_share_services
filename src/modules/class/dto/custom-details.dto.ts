import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, ValidateIf } from 'class-validator';
import { FrequencyUnits, MonthlyReps } from 'src/enums/class.enum';
import { BaseUtils } from 'src/utils/base.utils';

export class CustomDetailsDto {
  @ApiProperty({
    description: 'frequency',
    example: 1,
  })
  frequency: number;

  @ApiProperty({
    example: BaseUtils.getEnumKeys(FrequencyUnits).join('/'),
  })
  @IsIn(BaseUtils.getEnumKeys(FrequencyUnits), {
    message: `Frequency unit can only be ${BaseUtils.getEnumKeys(
      FrequencyUnits,
    ).join('/')}`,
  })
  freq_unit: string;

  @ApiProperty({
    description: 'MonthlyReps',
    example: `${BaseUtils.getEnumKeys(MonthlyReps).join('/')}`,
  })
  @ValidateIf((o) => o.freq_unit === FrequencyUnits[FrequencyUnits.Month])
  @IsIn(BaseUtils.getEnumKeys(MonthlyReps), {
    message: `Monthly reps can only be ${BaseUtils.getEnumKeys(
      MonthlyReps,
    ).join('/')}`,
  })
  monthly_reps: string;

  @ApiProperty({
    description: 'weekly_reps',
    example: ['monday', 'wednesday', 'friday'],
  })
  @ValidateIf((o) => o.freq_unit === FrequencyUnits[FrequencyUnits.Day])
  @IsNotEmpty()
  weekly_reps: [string];
}
