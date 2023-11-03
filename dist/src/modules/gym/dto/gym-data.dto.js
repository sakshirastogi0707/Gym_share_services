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
exports.GymUpdateRequestDto = exports.GymDataModal = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_response_dto_1 = require("../../../utils/base.response.dto");
const business_hours_data_dto_1 = require("./business-hours-data.dto");
const instructor_data_dto_1 = require("./instructor-data.dto");
const amenities_data_dto_1 = require("./amenities-data.dto");
const gym_category_data_dto_1 = require("./gym-category-data.dto");
const basic_gym_data_dto_1 = require("./basic-gym-data.dto");
const class_validator_1 = require("class-validator");
const gym_profile_business_opearting_hours_request_dto_1 = require("./gym-profile-business-opearting-hours-request.dto");
class GymData extends basic_gym_data_dto_1.BasicGymDataDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'id',
    }),
    __metadata("design:type", Number)
], GymData.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'ownerEmail',
    }),
    __metadata("design:type", String)
], GymData.prototype, "ownerEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'ownerEmail',
    }),
    __metadata("design:type", String)
], GymData.prototype, "ownerPhoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'ownerEmail',
    }),
    __metadata("design:type", String)
], GymData.prototype, "ownerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'birthDate',
    }),
    __metadata("design:type", String)
], GymData.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'businessName',
    }),
    __metadata("design:type", String)
], GymData.prototype, "businessName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'businessEmail',
    }),
    __metadata("design:type", String)
], GymData.prototype, "businessEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'businessAddress',
    }),
    __metadata("design:type", String)
], GymData.prototype, "businessAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'businessContact',
    }),
    __metadata("design:type", String)
], GymData.prototype, "businessContact", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'communicationAddress',
    }),
    __metadata("design:type", String)
], GymData.prototype, "communicationAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'photos',
    }),
    __metadata("design:type", String)
], GymData.prototype, "photos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'category',
    }),
    __metadata("design:type", Number)
], GymData.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'stepName',
    }),
    __metadata("design:type", String)
], GymData.prototype, "stepName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'waiver',
    }),
    __metadata("design:type", String)
], GymData.prototype, "waiver", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'waiver',
        name: 'waiverName',
    }),
    __metadata("design:type", String)
], GymData.prototype, "waiverName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'stripeAccountId',
    }),
    __metadata("design:type", String)
], GymData.prototype, "stripeAccountId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'googleBusinessProfile',
    }),
    __metadata("design:type", String)
], GymData.prototype, "googleBusinessProfile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'registrationMode',
    }),
    __metadata("design:type", String)
], GymData.prototype, "registrationMode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'about',
    }),
    __metadata("design:type", String)
], GymData.prototype, "about", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'instructors',
        type: () => [instructor_data_dto_1.InstructorDataDto],
    }),
    __metadata("design:type", Array)
], GymData.prototype, "instructors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'businessHours',
        type: () => [business_hours_data_dto_1.TimeSlot],
    }),
    __metadata("design:type", Array)
], GymData.prototype, "businessHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'gymCategories',
        type: () => [gym_category_data_dto_1.GymCategoryDataDto],
    }),
    __metadata("design:type", Array)
], GymData.prototype, "gymCategories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'amenities',
        type: () => [amenities_data_dto_1.AmenitiyDataModal],
    }),
    __metadata("design:type", Array)
], GymData.prototype, "amenities", void 0);
class GymDataModal extends base_response_dto_1.BaseResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'data',
    }),
    __metadata("design:type", GymData)
], GymDataModal.prototype, "data", void 0);
exports.GymDataModal = GymDataModal;
class GymUpdateRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'businessName',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GymUpdateRequestDto.prototype, "businessName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'this is the gym',
        maxLength: 500,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], GymUpdateRequestDto.prototype, "about", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Trainer',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GymUpdateRequestDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [1, 2, 3],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], GymUpdateRequestDto.prototype, "amenities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => [gym_profile_business_opearting_hours_request_dto_1.GBHRequest],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], GymUpdateRequestDto.prototype, "businessHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'base64://',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GymUpdateRequestDto.prototype, "photos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'base64://',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GymUpdateRequestDto.prototype, "coverPhoto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'adsasd',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GymUpdateRequestDto.prototype, "waiver", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'adsasd',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GymUpdateRequestDto.prototype, "waiverName", void 0);
exports.GymUpdateRequestDto = GymUpdateRequestDto;
//# sourceMappingURL=gym-data.dto.js.map