"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomDetailsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_enum_1 = require("../../../enums/class.enum");
const base_utils_1 = require("../../../utils/base.utils");
class CustomDetailsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'frequency',
        example: 1,
    }),
    __metadata("design:type", Number)
], CustomDetailsDto.prototype, "frequency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: base_utils_1.BaseUtils.getEnumKeys(class_enum_1.FrequencyUnits).join('/'),
    }),
    (0, class_validator_1.IsIn)(base_utils_1.BaseUtils.getEnumKeys(class_enum_1.FrequencyUnits), {
        message: `Frequency unit can only be ${base_utils_1.BaseUtils.getEnumKeys(class_enum_1.FrequencyUnits).join('/')}`,
    }),
    __metadata("design:type", String)
], CustomDetailsDto.prototype, "freq_unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'MonthlyReps',
        example: `${base_utils_1.BaseUtils.getEnumKeys(class_enum_1.MonthlyReps).join('/')}`,
    }),
    (0, class_validator_1.ValidateIf)((o) => o.freq_unit === class_enum_1.FrequencyUnits[class_enum_1.FrequencyUnits.Month]),
    (0, class_validator_1.IsIn)(base_utils_1.BaseUtils.getEnumKeys(class_enum_1.MonthlyReps), {
        message: `Monthly reps can only be ${base_utils_1.BaseUtils.getEnumKeys(class_enum_1.MonthlyReps).join('/')}`,
    }),
    __metadata("design:type", String)
], CustomDetailsDto.prototype, "monthly_reps", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'weekly_reps',
        example: ['monday', 'wednesday', 'friday'],
    }),
    (0, class_validator_1.ValidateIf)((o) => o.freq_unit === class_enum_1.FrequencyUnits[class_enum_1.FrequencyUnits.Day]),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CustomDetailsDto.prototype, "weekly_reps", void 0);
exports.CustomDetailsDto = CustomDetailsDto;
//# sourceMappingURL=custom-details.dto.js.map