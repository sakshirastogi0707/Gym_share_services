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
exports.UserCategorySubCategory = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("./user.entity");
const fitness_category_entity_1 = require("./fitness.category.entity");
const fitness_subcategory_entity_1 = require("./fitness.subcategory.entity");
const base_model_1 = require("../../../utils/base.model");
let UserCategorySubCategory = class UserCategorySubCategory extends base_model_1.BaseModel {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", typeof BigInt === "function" ? BigInt : Object)
], UserCategorySubCategory.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID',
        example: '1',
    }),
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Generated)('uuid'),
    __metadata("design:type", String)
], UserCategorySubCategory.prototype, "uuid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User Id',
        example: 1,
    }),
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], UserCategorySubCategory.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.userCategorySubcategories),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], UserCategorySubCategory.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Category Id',
        example: 1,
    }),
    (0, typeorm_1.Column)({ name: 'category_id' }),
    __metadata("design:type", Number)
], UserCategorySubCategory.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => fitness_category_entity_1.FitnessCategory, (fc) => fc.userCategorySubcategories),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", fitness_category_entity_1.FitnessCategory)
], UserCategorySubCategory.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Subcategory Id',
        example: 2,
    }),
    (0, typeorm_1.Column)({ name: 'subcategory_id', nullable: true }),
    __metadata("design:type", Number)
], UserCategorySubCategory.prototype, "subCategoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => fitness_subcategory_entity_1.FitnessSubCategory, (fsc) => fsc.userCategorySubcategories),
    (0, typeorm_1.JoinColumn)({ name: 'subcategory_id' }),
    __metadata("design:type", fitness_subcategory_entity_1.FitnessSubCategory)
], UserCategorySubCategory.prototype, "subcategory", void 0);
UserCategorySubCategory = __decorate([
    (0, typeorm_1.Entity)('user_fitness_categories'),
    (0, typeorm_1.Unique)('user_category_subcategory_unique_constraint', [
        'userId',
        'categoryId',
        'subCategoryId',
    ])
], UserCategorySubCategory);
exports.UserCategorySubCategory = UserCategorySubCategory;
//# sourceMappingURL=user.category.subcategory.entity.js.map