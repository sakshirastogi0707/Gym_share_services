import { FrequencyUnits, MonthlyReps } from 'src/enums/class.enum';
import { ValueTransformer } from 'typeorm';

export class CustomRepeatTransformer implements ValueTransformer {
  to(value: any): any {
    const newValue: any = { ...value };
    newValue.freq_unit = FrequencyUnits[newValue.freq_unit];
    if (newValue.freq_unit === FrequencyUnits.Month) {
      newValue.monthly_reps = MonthlyReps[newValue.monthly_reps];
    }
    if (newValue.freq_unit === FrequencyUnits.Week) {
      newValue.weekly_reps = MonthlyReps[newValue.weekly_reps];
    }
    return newValue;
  }

  from(value: any): any {
    const newValue: any = { ...value };
    newValue.freq_unit = FrequencyUnits[value];
    if (newValue.freq_unit === FrequencyUnits.Month) {
      newValue.monthly_reps = MonthlyReps[newValue.monthly_reps];
    }
    if (newValue.freq_unit === FrequencyUnits.Week) {
      newValue.weekly_reps = MonthlyReps[newValue.weekly_reps];
    }
    return newValue;
  }
}
