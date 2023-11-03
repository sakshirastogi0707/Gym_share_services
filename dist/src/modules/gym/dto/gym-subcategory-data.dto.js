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
exports.GymSubCategoryDataDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class GymSubCategoryDataDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'id',
    }),
    __metadata("design:type", String)
], GymSubCategoryDataDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'name',
    }),
    __metadata("design:type", String)
], GymSubCategoryDataDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'description',
    }),
    __metadata("design:type", String)
], GymSubCategoryDataDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'orderID',
    }),
    __metadata("design:type", String)
], GymSubCategoryDataDto.prototype, "orderID", void 0);
exports.GymSubCategoryDataDto = GymSubCategoryDataDto;
//# sourceMappingURL=gym-subcategory-data.dto.js.map