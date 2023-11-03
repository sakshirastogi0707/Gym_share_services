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
exports.GetAllInstructorResponseSuccessDto = exports.UpdateInstructorResponseSuccessDto = exports.UpdateInstructorDto = exports.CreateInstructorSuccessDto = exports.CreateInstructorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const trained_for_model_1 = require("./trained_for.model");
const certificate_model_1 = require("./certificate.model");
const base_response_dto_1 = require("../../../utils/base.response.dto");
class CreateInstructorDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Instructor Name',
        example: 'Kelly Archer',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInstructorDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Photo',
        example: 'picture://pic',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInstructorDto.prototype, "photo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'trainedFor',
        type: () => [trained_for_model_1.TrainedForDataModel],
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CreateInstructorDto.prototype, "trainedFor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'About',
        example: 'Very motivational and helpful whenever approached',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInstructorDto.prototype, "about", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Experience in years',
        example: 5,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateInstructorDto.prototype, "expYears", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Experience in months',
        example: 5,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateInstructorDto.prototype, "expMonths", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date of birth',
        example: '1994-02-26',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.MinDate)(new Date('1900-01-01')),
    (0, class_validator_1.MaxDate)(new Date()),
    __metadata("design:type", Date)
], CreateInstructorDto.prototype, "dob", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Gym Id',
        example: 2,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateInstructorDto.prototype, "gymId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'certificates',
        type: () => [certificate_model_1.Certificate],
    }),
    __metadata("design:type", Array)
], CreateInstructorDto.prototype, "certificates", void 0);
exports.CreateInstructorDto = CreateInstructorDto;
class CreateInstructorSuccessDto extends base_response_dto_1.BaseResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", CreateInstructorDto)
], CreateInstructorSuccessDto.prototype, "data", void 0);
exports.CreateInstructorSuccessDto = CreateInstructorSuccessDto;
class UpdateInstructorDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Instructor Name',
        example: 'Kelly Archer',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInstructorDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Photo',
        example: 'picture://pic',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInstructorDto.prototype, "photo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'trainedFor',
        type: () => [trained_for_model_1.TrainedForDataModel],
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateInstructorDto.prototype, "trainedFor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'About',
        example: 'Very motivational and helpful whenever approached',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateInstructorDto.prototype, "about", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Experience in years',
        example: 5,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateInstructorDto.prototype, "expYears", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Experience in months',
        example: 5,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateInstructorDto.prototype, "expMonths", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date of birth',
        example: '1994-02-26',
    }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateInstructorDto.prototype, "dob", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Gym Id',
        example: 2,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateInstructorDto.prototype, "gymId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'certificates',
        type: () => [certificate_model_1.Certificate],
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateInstructorDto.prototype, "certificates", void 0);
exports.UpdateInstructorDto = UpdateInstructorDto;
class UpdateInstructorResponseSuccessDto extends base_response_dto_1.BaseResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'data',
    }),
    __metadata("design:type", UpdateInstructorDto)
], UpdateInstructorResponseSuccessDto.prototype, "data", void 0);
exports.UpdateInstructorResponseSuccessDto = UpdateInstructorResponseSuccessDto;
class GetAllInstructorResponseSuccessDto extends base_response_dto_1.BaseResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'data',
        type: () => [CreateInstructorDto],
    }),
    __metadata("design:type", Array)
], GetAllInstructorResponseSuccessDto.prototype, "data", void 0);
exports.GetAllInstructorResponseSuccessDto = GetAllInstructorResponseSuccessDto;
//# sourceMappingURL=create-instructor.dto.js.map