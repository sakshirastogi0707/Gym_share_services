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
exports.GymProfileBusinessOperatingHoursRequestDto = exports.GBHRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const business_hours_data_dto_1 = require("./business-hours-data.dto");
class GBHRequest {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Business Operating Weekdays',
        example: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GBHRequest.prototype, "day", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'timeSlots',
        type: () => [business_hours_data_dto_1.TimeSlot],
    }),
    __metadata("design:type", Array)
], GBHRequest.prototype, "timeSlots", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Open 24-Hours',
        example: 'True or False',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], GBHRequest.prototype, "open24Hour", void 0);
exports.GBHRequest = GBHRequest;
class GymProfileBusinessOperatingHoursRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'data',
        type: () => [GBHRequest],
    }),
    __metadata("design:type", Array)
], GymProfileBusinessOperatingHoursRequestDto.prototype, "data", void 0);
exports.GymProfileBusinessOperatingHoursRequestDto = GymProfileBusinessOperatingHoursRequestDto;
//# sourceMappingURL=gym-profile-business-opearting-hours-request.dto.js.map