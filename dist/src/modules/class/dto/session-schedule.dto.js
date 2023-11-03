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
exports.UpdateSessionScheduleDto = exports.SessionScheduleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const custom_details_dto_1 = require("./custom-details.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const class_enum_1 = require("../../../enums/class.enum");
const base_utils_1 = require("../../../utils/base.utils");
class SessionScheduleDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Start date',
        example: '2023-11-11',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], SessionScheduleDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'End date',
        example: '2023-12-12',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], SessionScheduleDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Start Time',
        example: '12:10',
    }),
    __metadata("design:type", String)
], SessionScheduleDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'End Time',
        example: '13:10',
    }),
    __metadata("design:type", String)
], SessionScheduleDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Occurences',
        example: 10,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], SessionScheduleDto.prototype, "occurences", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Repeat',
        example: base_utils_1.BaseUtils.getEnumKeys(class_enum_1.ClassRepeat).join('/'),
    }),
    (0, class_validator_1.IsIn)(base_utils_1.BaseUtils.getEnumKeys(class_enum_1.ClassRepeat), {
        message: `repeat can only be ${base_utils_1.BaseUtils.getEnumKeys(class_enum_1.ClassRepeat)}`,
    }),
    __metadata("design:type", String)
], SessionScheduleDto.prototype, "repeat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => custom_details_dto_1.CustomDetailsDto,
    }),
    (0, class_transformer_1.Type)(() => custom_details_dto_1.CustomDetailsDto),
    (0, class_validator_1.ValidateIf)((o) => o.repeat === class_enum_1.ClassRepeat[class_enum_1.ClassRepeat.Custom]),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", custom_details_dto_1.CustomDetailsDto)
], SessionScheduleDto.prototype, "customDetails", void 0);
exports.SessionScheduleDto = SessionScheduleDto;
class UpdateSessionScheduleDto extends SessionScheduleDto {
}
exports.UpdateSessionScheduleDto = UpdateSessionScheduleDto;
//# sourceMappingURL=session-schedule.dto.js.map