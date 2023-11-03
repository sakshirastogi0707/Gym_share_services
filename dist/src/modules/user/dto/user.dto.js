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
exports.MobileNumberDto = exports.CreateEarlyUserSignupRequestDto = exports.UserProfileCategoryUpdateSuccessDto = exports.UpdateUserProfileCategoryRequestDto = exports.UpdateUserSignupSuccessDto = exports.UpdateUserSignupRequestDto = exports.UserNameLocationUpdateSuccessDto = exports.UpdateUserNameLocationRequestDto = exports.UserDataModal = exports.UserData = exports.UserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const location_dto_1 = require("./location.dto");
const class_transformer_1 = require("class-transformer");
const experience_level_enum_1 = require("../../../enums/experience-level.enum");
const user_type_enum_1 = require("../../../enums/user-type.enum");
const fitness_category_dto_1 = require("./fitness-category.dto");
const base_response_dto_1 = require("../../../utils/base.response.dto");
const category_data_dto_1 = require("./category-data.dto");
class UserDto extends base_response_dto_1.BaseResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email Id',
        example: 'demouser@gmail.com',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UserDto.prototype, "emailId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Full Name',
        example: 'Himanshu Sharma',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Phone number',
        example: '+16701718980',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], UserDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'location',
        type: () => [location_dto_1.LocationDto],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => location_dto_1.LocationDto),
    __metadata("design:type", location_dto_1.LocationDto)
], UserDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Image file to upload',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDto.prototype, "profilePic", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Birthdate',
        example: 'yyyy-mm-dd',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], UserDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of all fitness experience',
        example: 'Beginner' || 'Experienced' || 'Intermediate',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(experience_level_enum_1.ExperienceLevel),
    __metadata("design:type", String)
], UserDto.prototype, "experienceLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Medical History',
        example: ['Sugar', 'Pain', 'Fever', 'Etc.'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UserDto.prototype, "medicalHistory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Certificate documents file to upload',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDto.prototype, "documentCertificate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UserType',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(user_type_enum_1.UserType),
    __metadata("design:type", Number)
], UserDto.prototype, "userType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'userCategories',
        type: () => [fitness_category_dto_1.FitnessCategoryDto],
    }),
    __metadata("design:type", Array)
], UserDto.prototype, "userCategories", void 0);
exports.UserDto = UserDto;
class UserData {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'id',
    }),
    __metadata("design:type", Number)
], UserData.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'emailId',
    }),
    __metadata("design:type", String)
], UserData.prototype, "emailId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'ownerPhonenumber',
    }),
    __metadata("design:type", String)
], UserData.prototype, "ownerPhoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'fullName',
    }),
    __metadata("design:type", String)
], UserData.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'birthDate',
    }),
    __metadata("design:type", String)
], UserData.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'experienceLevel',
    }),
    __metadata("design:type", String)
], UserData.prototype, "experienceLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'medicalHistory',
    }),
    __metadata("design:type", String)
], UserData.prototype, "medicalHistory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'documentCertificate',
        example: ['string', 'string'],
    }),
    __metadata("design:type", Array)
], UserData.prototype, "documentCertificate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'UserType',
    }),
    __metadata("design:type", String)
], UserData.prototype, "UserType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'stepName',
    }),
    __metadata("design:type", String)
], UserData.prototype, "stepName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'location',
        type: () => [location_dto_1.LocationDto],
    }),
    __metadata("design:type", Array)
], UserData.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'userCategories',
        type: () => [fitness_category_dto_1.FitnessCategoryDto],
    }),
    __metadata("design:type", Array)
], UserData.prototype, "userCategories", void 0);
exports.UserData = UserData;
class UserDataModal extends base_response_dto_1.BaseResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'data',
    }),
    __metadata("design:type", UserData)
], UserDataModal.prototype, "data", void 0);
exports.UserDataModal = UserDataModal;
class UpdateUserNameLocationRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Full Name',
        example: 'Babar Javaid',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserNameLocationRequestDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", location_dto_1.LocationDto)
], UpdateUserNameLocationRequestDto.prototype, "location", void 0);
exports.UpdateUserNameLocationRequestDto = UpdateUserNameLocationRequestDto;
class UserNameLocationUpdateSuccessDto extends base_response_dto_1.BaseResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", UpdateUserNameLocationRequestDto)
], UserNameLocationUpdateSuccessDto.prototype, "data", void 0);
exports.UserNameLocationUpdateSuccessDto = UserNameLocationUpdateSuccessDto;
class UpdateUserSignupRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'emailId',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateUserSignupRequestDto.prototype, "emailId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'phoneNumber',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserSignupRequestDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'userType',
    }),
    (0, class_validator_1.IsEnum)(user_type_enum_1.UserType),
    __metadata("design:type", Number)
], UpdateUserSignupRequestDto.prototype, "userType", void 0);
exports.UpdateUserSignupRequestDto = UpdateUserSignupRequestDto;
class UpdateUserSignupSuccessDto extends base_response_dto_1.BaseResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", UserDto)
], UpdateUserSignupSuccessDto.prototype, "data", void 0);
exports.UpdateUserSignupSuccessDto = UpdateUserSignupSuccessDto;
class UpdateUserProfileCategoryRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Category Data in Array of Object',
        type: () => [category_data_dto_1.ProfileCategoryData],
    }),
    __metadata("design:type", Array)
], UpdateUserProfileCategoryRequestDto.prototype, "categoryData", void 0);
exports.UpdateUserProfileCategoryRequestDto = UpdateUserProfileCategoryRequestDto;
class UserProfileCategoryUpdateSuccessDto extends base_response_dto_1.BaseResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'data',
    }),
    __metadata("design:type", Array)
], UserProfileCategoryUpdateSuccessDto.prototype, "data", void 0);
exports.UserProfileCategoryUpdateSuccessDto = UserProfileCategoryUpdateSuccessDto;
class CreateEarlyUserSignupRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'emailId',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateEarlyUserSignupRequestDto.prototype, "emailId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'businessAddress',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEarlyUserSignupRequestDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'phoneNumber',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEarlyUserSignupRequestDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'fullName',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEarlyUserSignupRequestDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'userType',
    }),
    (0, class_validator_1.IsEnum)(user_type_enum_1.UserType),
    __metadata("design:type", Number)
], CreateEarlyUserSignupRequestDto.prototype, "userType", void 0);
exports.CreateEarlyUserSignupRequestDto = CreateEarlyUserSignupRequestDto;
class MobileNumberDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: '+918585858585' }),
    __metadata("design:type", String)
], MobileNumberDto.prototype, "number", void 0);
exports.MobileNumberDto = MobileNumberDto;
//# sourceMappingURL=user.dto.js.map