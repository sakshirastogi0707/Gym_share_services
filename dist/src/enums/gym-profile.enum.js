"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegistrationModeByValue = exports.getGymTypeByValue = exports.getGymBusinessCategoryText = exports.RegistrationMode = exports.GymType = void 0;
var GymType;
(function (GymType) {
    GymType[GymType["Fitness Studio"] = 100] = "Fitness Studio";
    GymType[GymType["Trainer"] = 200] = "Trainer";
    GymType[GymType["Wellness Center"] = 300] = "Wellness Center";
})(GymType = exports.GymType || (exports.GymType = {}));
var RegistrationMode;
(function (RegistrationMode) {
    RegistrationMode[RegistrationMode["APP"] = 100] = "APP";
    RegistrationMode[RegistrationMode["WEB"] = 200] = "WEB";
})(RegistrationMode = exports.RegistrationMode || (exports.RegistrationMode = {}));
exports.getGymBusinessCategoryText = {
    100: 'Fitness Studio',
    200: 'Trainer',
    300: 'Wellness Center',
};
const getGymTypeByValue = (value) => {
    const key = Object.keys(GymType).find((k) => GymType[k] === value);
    return key ? GymType[key] : undefined;
};
exports.getGymTypeByValue = getGymTypeByValue;
const getRegistrationModeByValue = (value) => {
    const key = Object.keys(GymType).find((k) => RegistrationMode[k] === value);
    return key
        ? RegistrationMode[key]
        : undefined;
};
exports.getRegistrationModeByValue = getRegistrationModeByValue;
//# sourceMappingURL=gym-profile.enum.js.map