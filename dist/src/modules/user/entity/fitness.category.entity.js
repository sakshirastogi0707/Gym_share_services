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
exports.FitnessCategory = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const base_model_1 = require("../../../utils/base.model");
const user_category_subcategory_entity_1 = require("./user.category.subcategory.entity");
const fitness_subcategory_entity_1 = require("./fitness.subcategory.entity");
const gym_category_subcategory_entity_1 = require("../../gym/entities/gym.category.subcategory.entity");
const trained_for_entity_1 = require("../../instructor/entities/trained_for.entity");
const class_category_subcategory_entity_1 = require("../../class/entities/class-category-subcategory.entity");
let FitnessCategory = class FitnessCategory extends base_model_1.BaseModel {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of all the fitness categories',
        example: 'Yoga and HIIT',
    }),
    (0, typeorm_1.Column)({ name: 'name', length: 100, nullable: true }),
    __metadata("design:type", String)
], FitnessCategory.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'All Fitness categories description',
        example: 'Yoga and HIIT',
    }),
    (0, typeorm_1.Column)({ name: 'description', length: 200, nullable: true }),
    __metadata("design:type", String)
], FitnessCategory.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Category Icon',
        example: 'Yoga and HIIT',
    }),
    (0, typeorm_1.Column)({ name: 'icon', nullable: true }),
    __metadata("design:type", String)
], FitnessCategory.prototype, "icon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Choice of the selection of categories of fitness choices',
        example: 'Cycling and Acrobatics',
    }),
    (0, typeorm_1.Column)({ name: 'order_id', nullable: false }),
    __metadata("design:type", Number)
], FitnessCategory.prototype, "orderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of all the fitness available categories status ',
        example: 'True or False',
    }),
    (0, typeorm_1.Column)({ name: 'active', type: 'boolean' }),
    __metadata("design:type", Boolean)
], FitnessCategory.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => fitness_subcategory_entity_1.FitnessSubCategory, (fsc) => fsc.category),
    __metadata("design:type", Array)
], FitnessCategory.prototype, "subcategory", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_category_subcategory_entity_1.UserCategorySubCategory, (ucs) => ucs.category),
    __metadata("design:type", Array)
], FitnessCategory.prototype, "userCategorySubcategories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => class_category_subcategory_entity_1.ClassCategorySubcategory, (ccs) => ccs.category),
    __metadata("design:type", Array)
], FitnessCategory.prototype, "classCategorySubcategories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => gym_category_subcategory_entity_1.GymCategorySubCategory, (gcs) => gcs.category),
    __metadata("design:type", Array)
], FitnessCategory.prototype, "gymCategorySubcategories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => trained_for_entity_1.InstructorTrainedFor, (itf) => itf.category),
    __metadata("design:type", Array)
], FitnessCategory.prototype, "trainedForCategory", void 0);
FitnessCategory = __decorate([
    (0, typeorm_1.Entity)('fitness_category')
], FitnessCategory);
exports.FitnessCategory = FitnessCategory;
//# sourceMappingURL=fitness.category.entity.js.map