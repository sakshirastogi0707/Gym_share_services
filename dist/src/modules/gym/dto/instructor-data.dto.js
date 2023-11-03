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
exports.InstructorDetailsReponse = exports.InstructorDataDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_response_dto_1 = require("../../../utils/base.response.dto");
class InstructorDataDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'name',
    }),
    __metadata("design:type", String)
], InstructorDataDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'photo',
    }),
    __metadata("design:type", String)
], InstructorDataDto.prototype, "photo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'dob',
    }),
    __metadata("design:type", String)
], InstructorDataDto.prototype, "dob", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'about',
    }),
    __metadata("design:type", String)
], InstructorDataDto.prototype, "about", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'exp_years',
    }),
    __metadata("design:type", Number)
], InstructorDataDto.prototype, "exp_years", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'exp_months',
    }),
    __metadata("design:type", Number)
], InstructorDataDto.prototype, "exp_months", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'active',
    }),
    __metadata("design:type", Boolean)
], InstructorDataDto.prototype, "active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'gymId',
    }),
    __metadata("design:type", Number)
], InstructorDataDto.prototype, "gymId", void 0);
exports.InstructorDataDto = InstructorDataDto;
class InstructorDetailsReponse extends base_response_dto_1.BaseResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", InstructorDataDto)
], InstructorDetailsReponse.prototype, "data", void 0);
exports.InstructorDetailsReponse = InstructorDetailsReponse;
//# sourceMappingURL=instructor-data.dto.js.map