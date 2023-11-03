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
exports.UserGymDetailDataResponseDto = exports.UserGymDetailData = exports.UserGymClassesDetailDto = exports.BasicGymDataResponseDto = exports.BasicGymDataDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const base_response_dto_1 = require("../../../utils/base.response.dto");
const amenities_data_dto_1 = require("./amenities-data.dto");
const class_dto_1 = require("../../class/dto/class.dto");
class BasicGymDataDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'id',
    }),
    (0, swagger_1.ApiProperty)({
        name: 'businessName',
    }),
    __metadata("design:type", String)
], BasicGymDataDto.prototype, "businessName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'businessAddress',
    }),
    __metadata("design:type", String)
], BasicGymDataDto.prototype, "businessAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'photos',
    }),
    __metadata("design:type", String)
], BasicGymDataDto.prototype, "photos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'description',
    }),
    __metadata("design:type", String)
], BasicGymDataDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'status',
    }),
    __metadata("design:type", Number)
], BasicGymDataDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'amenities',
        type: () => [amenities_data_dto_1.AmenitiyDataModal],
    }),
    __metadata("design:type", Array)
], BasicGymDataDto.prototype, "amenities", void 0);
exports.BasicGymDataDto = BasicGymDataDto;
class BasicGymDataResponseDto extends base_response_dto_1.BaseResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'data',
    }),
    __metadata("design:type", BasicGymDataDto)
], BasicGymDataResponseDto.prototype, "data", void 0);
exports.BasicGymDataResponseDto = BasicGymDataResponseDto;
class UserGymClassesDetailDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Class Name',
        example: 'Yoga Class',
    }),
    __metadata("design:type", String)
], UserGymClassesDetailDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'About Class',
    }),
    __metadata("design:type", class_dto_1.AboutClass)
], UserGymClassesDetailDto.prototype, "about", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Photo Thumbnail',
        example: 'Photo://thumb',
    }),
    __metadata("design:type", String)
], UserGymClassesDetailDto.prototype, "photoThumbnail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Duration',
        example: 60,
    }),
    __metadata("design:type", Number)
], UserGymClassesDetailDto.prototype, "duration", void 0);
exports.UserGymClassesDetailDto = UserGymClassesDetailDto;
class UserGymDetailData extends BasicGymDataDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'classes',
        type: () => [UserGymClassesDetailDto],
    }),
    __metadata("design:type", Array)
], UserGymDetailData.prototype, "classes", void 0);
exports.UserGymDetailData = UserGymDetailData;
class UserGymDetailDataResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'data',
    }),
    __metadata("design:type", UserGymDetailData)
], UserGymDetailDataResponseDto.prototype, "data", void 0);
exports.UserGymDetailDataResponseDto = UserGymDetailDataResponseDto;
//# sourceMappingURL=basic-gym-data.dto.js.map