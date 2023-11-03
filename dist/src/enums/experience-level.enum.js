"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFitnessExperienceStatusByValue = exports.ExperienceLevel = void 0;
var ExperienceLevel;
(function (ExperienceLevel) {
    ExperienceLevel["BEGINNER"] = "Beginner";
    ExperienceLevel["EXPERIENCED"] = "Experienced";
    ExperienceLevel["INTERMEDIATE"] = "Intermediate";
})(ExperienceLevel = exports.ExperienceLevel || (exports.ExperienceLevel = {}));
const getFitnessExperienceStatusByValue = (value) => {
    return Object.keys(ExperienceLevel)[Object.values(ExperienceLevel).indexOf(value)];
};
exports.getFitnessExperienceStatusByValue = getFitnessExperienceStatusByValue;
//# sourceMappingURL=experience-level.enum.js.map