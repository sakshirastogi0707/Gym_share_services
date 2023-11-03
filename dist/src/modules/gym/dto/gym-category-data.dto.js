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
exports.GymCategoryDataDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const gym_subcategory_data_dto_1 = require("./gym-subcategory-data.dto");
class GymCategoryDataDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'id',
    }),
    __metadata("design:type", String)
], GymCategoryDataDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'name',
    }),
    __metadata("design:type", String)
], GymCategoryDataDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'subCategory',
        type: () => [gym_subcategory_data_dto_1.GymSubCategoryDataDto],
    }),
    __metadata("design:type", Array)
], GymCategoryDataDto.prototype, "subCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'orderID',
    }),
    __metadata("design:type", String)
], GymCategoryDataDto.prototype, "orderID", void 0);
exports.GymCategoryDataDto = GymCategoryDataDto;
//# sourceMappingURL=gym-category-data.dto.js.map