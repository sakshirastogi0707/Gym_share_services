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
exports.CreateBookingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const add_ons_data_dto_1 = require("../../class/dto/add-ons-data.dto");
const someoneElse_dto_1 = require("./someoneElse.dto");
const base_utils_1 = require("../../../utils/base.utils");
const booking_enum_1 = require("../../../enums/booking.enum");
class CreateBookingDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Class ID',
        example: 1,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateBookingDto.prototype, "class", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Session ID',
        example: [1],
        isArray: true,
        type: [Number],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], CreateBookingDto.prototype, "sessions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Booking For',
        example: base_utils_1.BaseUtils.getEnumKeys(booking_enum_1.BookingFor).join('/'),
    }),
    (0, class_validator_1.IsIn)(base_utils_1.BaseUtils.getEnumKeys(booking_enum_1.BookingFor), {
        message: `Booking for can only be ${base_utils_1.BaseUtils.getEnumKeys(booking_enum_1.BookingFor)}`,
    }),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "bookingFor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Add Ons',
        type: () => [add_ons_data_dto_1.AddOnsDataModel],
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateBookingDto.prototype, "addOns", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Coupon',
        example: 'flat50',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "coupon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'is Booking for Someone else',
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateBookingDto.prototype, "isForSomeoneElse", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Someone else',
        type: () => someoneElse_dto_1.SomeoneElseModel,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", someoneElse_dto_1.SomeoneElseModel)
], CreateBookingDto.prototype, "someoneElse", void 0);
exports.CreateBookingDto = CreateBookingDto;
//# sourceMappingURL=create-booking.dto.js.map