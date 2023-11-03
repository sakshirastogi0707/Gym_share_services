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
exports.InstructorTrainedFor = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const instructor_entity_1 = require("./instructor.entity");
const fitness_subcategory_entity_1 = require("../../user/entity/fitness.subcategory.entity");
const base_model_1 = require("../../../utils/base.model");
const fitness_category_entity_1 = require("../../user/entity/fitness.category.entity");
let InstructorTrainedFor = class InstructorTrainedFor extends base_model_1.BaseModel {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", typeof BigInt === "function" ? BigInt : Object)
], InstructorTrainedFor.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Instructor Id',
        example: 1,
    }),
    (0, typeorm_1.Column)({ name: 'instructor_id' }),
    __metadata("design:type", Number)
], InstructorTrainedFor.prototype, "instructorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => instructor_entity_1.Instructor, (instructor) => instructor.trainedFor),
    (0, typeorm_1.JoinColumn)({ name: 'instructor_id' }),
    __metadata("design:type", instructor_entity_1.Instructor)
], InstructorTrainedFor.prototype, "instructor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Category Id',
        example: 1,
    }),
    (0, typeorm_1.Column)({ name: 'category_id' }),
    __metadata("design:type", Number)
], InstructorTrainedFor.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Subcategory Id',
        example: 2,
    }),
    (0, typeorm_1.Column)({ name: 'subcategory_id', nullable: true }),
    __metadata("design:type", Number)
], InstructorTrainedFor.prototype, "subCategoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => fitness_subcategory_entity_1.FitnessSubCategory, (fsc) => fsc.trainedForSubcategories),
    (0, typeorm_1.JoinColumn)({ name: 'subcategory_id' }),
    __metadata("design:type", fitness_subcategory_entity_1.FitnessSubCategory)
], InstructorTrainedFor.prototype, "subcategory", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => fitness_category_entity_1.FitnessCategory, (fsc) => fsc.trainedForCategory),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", fitness_category_entity_1.FitnessCategory)
], InstructorTrainedFor.prototype, "category", void 0);
InstructorTrainedFor = __decorate([
    (0, typeorm_1.Entity)('instructor_trained_for'),
    (0, typeorm_1.Unique)('instructor_trained_for_unique_constraint', [
        'instructorId',
        'categoryId',
        'subCategoryId',
    ])
], InstructorTrainedFor);
exports.InstructorTrainedFor = InstructorTrainedFor;
//# sourceMappingURL=trained_for.entity.js.map