"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomRepeatTransformer = void 0;
const class_enum_1 = require("../../enums/class.enum");
class CustomRepeatTransformer {
    to(value) {
        const newValue = Object.assign({}, value);
        newValue.freq_unit = class_enum_1.FrequencyUnits[newValue.freq_unit];
        if (newValue.freq_unit === class_enum_1.FrequencyUnits.Month) {
            newValue.monthly_reps = class_enum_1.MonthlyReps[newValue.monthly_reps];
        }
        if (newValue.freq_unit === class_enum_1.FrequencyUnits.Week) {
            newValue.weekly_reps = class_enum_1.MonthlyReps[newValue.weekly_reps];
        }
        return newValue;
    }
    from(value) {
        const newValue = Object.assign({}, value);
        newValue.freq_unit = class_enum_1.FrequencyUnits[value];
        if (newValue.freq_unit === class_enum_1.FrequencyUnits.Month) {
            newValue.monthly_reps = class_enum_1.MonthlyReps[newValue.monthly_reps];
        }
        if (newValue.freq_unit === class_enum_1.FrequencyUnits.Week) {
            newValue.weekly_reps = class_enum_1.MonthlyReps[newValue.weekly_reps];
        }
        return newValue;
    }
}
exports.CustomRepeatTransformer = CustomRepeatTransformer;
//# sourceMappingURL=custom-repeat.tranformer.js.map