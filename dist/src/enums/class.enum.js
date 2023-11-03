"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonthlyReps = exports.FrequencyUnits = exports.ClassRepeat = exports.Difficulty = exports.ClassStatus = void 0;
var ClassStatus;
(function (ClassStatus) {
    ClassStatus[ClassStatus["Draft"] = 100] = "Draft";
    ClassStatus[ClassStatus["Published"] = 200] = "Published";
    ClassStatus[ClassStatus["Deleted"] = 900] = "Deleted";
})(ClassStatus = exports.ClassStatus || (exports.ClassStatus = {}));
var Difficulty;
(function (Difficulty) {
    Difficulty[Difficulty["Beginner"] = 100] = "Beginner";
    Difficulty[Difficulty["Intermediate"] = 200] = "Intermediate";
    Difficulty[Difficulty["Experienced"] = 300] = "Experienced";
})(Difficulty = exports.Difficulty || (exports.Difficulty = {}));
var ClassRepeat;
(function (ClassRepeat) {
    ClassRepeat[ClassRepeat["Daily"] = 100] = "Daily";
    ClassRepeat[ClassRepeat["Weekly"] = 200] = "Weekly";
    ClassRepeat[ClassRepeat["Monthly"] = 300] = "Monthly";
    ClassRepeat[ClassRepeat["Custom"] = 400] = "Custom";
    ClassRepeat[ClassRepeat["NoRepeat"] = 500] = "NoRepeat";
})(ClassRepeat = exports.ClassRepeat || (exports.ClassRepeat = {}));
var FrequencyUnits;
(function (FrequencyUnits) {
    FrequencyUnits[FrequencyUnits["Day"] = 1] = "Day";
    FrequencyUnits[FrequencyUnits["Week"] = 2] = "Week";
    FrequencyUnits[FrequencyUnits["Month"] = 3] = "Month";
})(FrequencyUnits = exports.FrequencyUnits || (exports.FrequencyUnits = {}));
var MonthlyReps;
(function (MonthlyReps) {
    MonthlyReps[MonthlyReps["particular_date"] = 1] = "particular_date";
    MonthlyReps[MonthlyReps["particular_day"] = 2] = "particular_day";
    MonthlyReps[MonthlyReps["last_day"] = 3] = "last_day";
})(MonthlyReps = exports.MonthlyReps || (exports.MonthlyReps = {}));
//# sourceMappingURL=class.enum.js.map