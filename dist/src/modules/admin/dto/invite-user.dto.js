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
exports.GetUserViewResponseSuccessDto = exports.AdminUserViewData = exports.InviteUserRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_type_enum_1 = require("../../../enums/user-type.enum");
const base_response_dto_1 = require("../../../utils/base.response.dto");
class InviteUserRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name',
        example: 'John Kelly',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], InviteUserRequestDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email Id',
        example: 'demouser@gmail.com',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], InviteUserRequestDto.prototype, "emailId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UserType',
        example: 'Gym' || 'User',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(user_type_enum_1.UserType),
    __metadata("design:type", Number)
], InviteUserRequestDto.prototype, "userType", void 0);
exports.InviteUserRequestDto = InviteUserRequestDto;
class AdminUserViewData {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name',
        example: 'John Kelly',
    }),
    __metadata("design:type", String)
], AdminUserViewData.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email Id',
        example: 'demouser@gmail.com',
    }),
    __metadata("design:type", String)
], AdminUserViewData.prototype, "emailId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Phone number',
        example: '+16701718980',
    }),
    __metadata("design:type", String)
], AdminUserViewData.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Source',
        example: 'Self' || 'Invited',
    }),
    __metadata("design:type", String)
], AdminUserViewData.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status',
    }),
    __metadata("design:type", String)
], AdminUserViewData.prototype, "userStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UserType',
        example: 'Gym' || 'User',
    }),
    __metadata("design:type", Number)
], AdminUserViewData.prototype, "userType", void 0);
exports.AdminUserViewData = AdminUserViewData;
class GetUserViewResponseSuccessDto extends base_response_dto_1.BaseResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", AdminUserViewData)
], GetUserViewResponseSuccessDto.prototype, "data", void 0);
exports.GetUserViewResponseSuccessDto = GetUserViewResponseSuccessDto;
//# sourceMappingURL=invite-user.dto.js.map