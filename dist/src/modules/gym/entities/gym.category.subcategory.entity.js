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
exports.GymCategorySubCategory = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const fitness_category_entity_1 = require("../../user/entity/fitness.category.entity");
const fitness_subcategory_entity_1 = require("../../user/entity/fitness.subcategory.entity");
const base_model_1 = require("../../../utils/base.model");
const gym_entity_1 = require("./gym.entity");
let GymCategorySubCategory = class GymCategorySubCategory extends base_model_1.BaseModel {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", typeof BigInt === "function" ? BigInt : Object)
], GymCategorySubCategory.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID',
        example: '1',
    }),
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Generated)('uuid'),
    __metadata("design:type", String)
], GymCategorySubCategory.prototype, "uuid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Gym Id',
        example: 1,
    }),
    (0, typeorm_1.Column)({ name: 'gym_id' }),
    __metadata("design:type", Number)
], GymCategorySubCategory.prototype, "gymId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => gym_entity_1.Gym, (gym) => gym.gymCategorySubcategories),
    (0, typeorm_1.JoinColumn)({ name: 'gym_id' }),
    __metadata("design:type", gym_entity_1.Gym)
], GymCategorySubCategory.prototype, "gym", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Category Id',
        example: 1,
    }),
    (0, typeorm_1.Column)({ name: 'category_id' }),
    __metadata("design:type", Number)
], GymCategorySubCategory.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => fitness_category_entity_1.FitnessCategory, (fc) => fc.gymCategorySubcategories),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", fitness_category_entity_1.FitnessCategory)
], GymCategorySubCategory.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Subcategory Id',
        example: 2,
    }),
    (0, typeorm_1.Column)({ name: 'subcategory_id', nullable: true }),
    __metadata("design:type", Number)
], GymCategorySubCategory.prototype, "subCategoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => fitness_subcategory_entity_1.FitnessSubCategory, (fsc) => fsc.gymCategorySubcategories),
    (0, typeorm_1.JoinColumn)({ name: 'subcategory_id' }),
    __metadata("design:type", fitness_subcategory_entity_1.FitnessSubCategory)
], GymCategorySubCategory.prototype, "subcategory", void 0);
GymCategorySubCategory = __decorate([
    (0, typeorm_1.Entity)('gym_categories_subcategories'),
    (0, typeorm_1.Unique)('gym_category_subcategory_unique_constraint', [
        'gymId',
        'categoryId',
        'subCategoryId',
    ])
], GymCategorySubCategory);
exports.GymCategorySubCategory = GymCategorySubCategory;
//# sourceMappingURL=gym.category.subcategory.entity.js.map