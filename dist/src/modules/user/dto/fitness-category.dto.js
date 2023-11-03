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
exports.FitnessCategoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const fitness_subcategory_dto_1 = require("./fitness-subcategory.dto");
const base_response_dto_1 = require("../../../utils/base.response.dto");
class FitnessCategoryDto extends base_response_dto_1.BaseResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name',
        example: 'Yoga and HIIT',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FitnessCategoryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Description',
        example: 'Yoga is key source of energy...',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FitnessCategoryDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Url of fitness icon',
        example: 'https://cdn.io/yux/img/src/101.jpeg',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FitnessCategoryDto.prototype, "icon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Order Id',
        example: 1,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FitnessCategoryDto.prototype, "orderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'subCategory',
        type: () => [fitness_subcategory_dto_1.FitnessSubCategoryDto],
    }),
    __metadata("design:type", Array)
], FitnessCategoryDto.prototype, "subCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status',
        type: 'boolean',
        example: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], FitnessCategoryDto.prototype, "isActive", void 0);
exports.FitnessCategoryDto = FitnessCategoryDto;
//# sourceMappingURL=fitness-category.dto.js.map